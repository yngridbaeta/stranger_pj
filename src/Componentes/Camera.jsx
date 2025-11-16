 
import { useRef, useState, useEffect } from "react";
import styles from "../Style/Camera.module.css";

 
export function Camera({ onFotoTirada }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [foto, setFoto] = useState(null);
 
 
 
  // Inicia a câmera automaticamente
  useEffect(() => {
    iniciarCamera();
  }, []);
 
  const iniciarCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Erro ao acessar a câmera:", error);
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
 
    if (onFotoTirada) {
      onFotoTirada(imagem); // envia a foto para o componente pai
    }
  };
 
 
  const reiniciar = () => {
    setFoto(null);
    iniciarCamera();
  };
 
 
  // Submissão
  const onSubmit = (data) => {
    console.log(" Dados enviados:", data, "📷 Foto:", foto);
    alert("Formulário válido e enviado!");
  };
 
return (
    <section className={styles.cameraBox}>

      <div className={styles.preview}>
        {!foto ? (
          <video ref={videoRef} autoPlay playsInline aria-label="Fluxo da câmera" />
        ) : (
          <img src={foto} alt="Foto capturada" />
        )}
      </div>

      <div className={styles.botoes}>
        {!foto ? (
          <button type="button" onClick={tirarFoto} className={styles.btnAcao}>
            Tirar Foto
          </button>
        ) : (
          <button type="button" onClick={reiniciar} className={styles.btnSecundario}>
            Nova Foto
          </button>
        )}
      </div>

      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
    </section>
  );
}