import { useRef, useState, useEffect } from "react";
import styles from "../Style/Camera.module.css";

export function Camera({ onFotoTirada }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [foto, setFoto] = useState(null);
  const [cameraStatus, setCameraStatus] = useState("carregando");
  const [mensagemStatus, setMensagemStatus] = useState("Iniciando câmera...");
 
  // Inicia a câmera automaticamente
  useEffect(() => {
    iniciarCamera();
  }, []);
 
  const iniciarCamera = async () => {
    setCameraStatus("carregando");
    setMensagemStatus("Iniciando câmera...");
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraStatus("ativa");
        setMensagemStatus("Câmera ativa e pronta para captura");
      }
    } catch (error) {
      console.error("Erro ao acessar a câmera:", error);
      setCameraStatus("erro");
      setMensagemStatus("Erro ao acessar a câmera. Verifique as permissões.");
    }
  };
 
  const tirarFoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
 
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
 
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
 
    const imagem = canvas.toDataURL("image/png");
    setFoto(imagem);
    setMensagemStatus("Foto capturada com sucesso");
    
    // Para a câmera após tirar a foto
    if (video.srcObject) {
      video.srcObject.getTracks().forEach(track => track.stop());
    }
 
    if (onFotoTirada) {
      onFotoTirada(imagem);
    }
  };
 
  const reiniciar = () => {
    setFoto(null);
    setMensagemStatus("Reiniciando câmera...");
    iniciarCamera();
  };
 
  // Submissão
  const onSubmit = (data) => {
    console.log(" Dados enviados:", data, "📷 Foto:", foto);
    alert("Formulário válido e enviado!");
  };
 
  return (
    <section 
      className={styles.cameraBox}
      role="region"
      aria-labelledby="camera-title"
      aria-describedby="camera-description"
    >
      {/* Título visualmente oculto para leitores de tela */}
      <h2 id="camera-title" className={styles.srOnly}>
        Captura de Fotografia
      </h2>
      
      {/* Descrição visualmente oculta */}
      <p id="camera-description" className={styles.srOnly}>
        Seção para capturar fotografia usando a câmera do dispositivo
      </p>
      
      {/* Live region para anunciar mudanças de estado */}
      <div 
        role="status" 
        aria-live="polite" 
        aria-atomic="true"
        className={styles.srOnly}
      >
        {mensagemStatus}
      </div>

      <div 
        className={styles.preview}
        role="img"
        aria-label={foto ? "Pré-visualização da foto capturada" : "Visualização da câmera ao vivo"}
      >
        {!foto ? (
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            aria-label="Transmissão ao vivo da câmera"
            aria-live="off"
          />
        ) : (
          <img 
            src={foto} 
            alt="Fotografia capturada pelo usuário"
            role="img"
            aria-describedby="foto-info"
          />
        )}
        
        {/* Informação adicional sobre a foto */}
        {foto && (
          <span id="foto-info" className={styles.srOnly}>
            Foto capturada e pronta para ser utilizada. Use o botão Nova Foto para capturar novamente.
          </span>
        )}
      </div>

      <div 
        className={styles.botoes}
        role="group"
        aria-label="Controles da câmera"
      >
        {!foto ? (
          <button 
            type="button" 
            onClick={tirarFoto} 
            className={styles.btnAcao}
            aria-label="Capturar fotografia"
            disabled={cameraStatus !== "ativa"}
            aria-disabled={cameraStatus !== "ativa"}
          >
            Tirar Foto
          </button>
        ) : (
          <button 
            type="button" 
            onClick={reiniciar} 
            className={styles.btnSecundario}
            aria-label="Descartar foto atual e capturar nova fotografia"
          >
            Nova Foto
          </button>
        )}
      </div>

      <canvas 
        ref={canvasRef} 
        style={{ display: "none" }}
        aria-hidden="true"
        role="presentation"
      />
    </section>
  );
}