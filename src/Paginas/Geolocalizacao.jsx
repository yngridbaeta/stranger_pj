import { useRef, useState, useEffect } from "react";
import { Menu } from "../Componentes/Menu";
import styles from "../Style/Geolocalizacao.module.css";

export function Geolocalizacao() {

  // Referência para o elemento HTML onde o mapa será renderizado
  const mapRef = useRef(null);

  // Armazena a instância do mapa do Google (impede recriação)
  const mapInstanceRef = useRef(null);

  // Serviços do Google Maps utilizados para gerar rotas
  const directionsServiceRef = useRef(null);
  const directionsRendererRef = useRef(null);

  // Estados que guardam coordenadas de origem e destino
  const [origem, setOrigem] = useState({ lat: "", lng: "" });
  const [destino, setDestino] = useState({ lat: "", lng: "" });

  // Guarda mensagens de erro vinculadas aos campos
  const [erros, setErros] = useState({});

  // Indica se o script do Google Maps já foi carregado
  const [mapLoaded, setMapLoaded] = useState(false);

  // ================================
  // CARREGAR SCRIPT DO GOOGLE MAPS
  // ================================
  useEffect(() => {
    // Se o script já existe, só ativa flag
    if (window.google && window.google.maps) {
      setMapLoaded(true);
      return;
    }

    // Cria script dinamicamente
    const script = document.createElement("script");
    script.src =
      `https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&libraries=geometry`;
    script.async = true;
    script.defer = true;

    // Quando carregar, atualiza o estado
    script.onload = () => setMapLoaded(true);

    document.head.appendChild(script);

    // Remove o script ao desmontar o componente
    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  // ================================
  // INICIALIZAR O MAPA
  // ================================
  useEffect(() => {
    // Só inicializa se o script carregou e o mapa ainda não foi criado
    if (!mapLoaded || mapInstanceRef.current || !mapRef.current) return;

    // Criação do mapa centralizado em São Paulo
    mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
      center: { lat: -23.55052, lng: -46.633308 },
      zoom: 13,
      mapTypeControl: true,
      streetViewControl: false,
    });

    // Serviços de rotas
    directionsServiceRef.current = new window.google.maps.DirectionsService();
    directionsRendererRef.current = new window.google.maps.DirectionsRenderer({
      map: mapInstanceRef.current,
      suppressMarkers: false,
    });
  }, [mapLoaded]);

  // ================================
  // VALIDA OS CAMPOS
  // ================================
  const validarCampos = () => {
    const temp = {};

    if (!origem.lat || isNaN(parseFloat(origem.lat)))
      temp.origemLat = "Latitude inválida";

    if (!origem.lng || isNaN(parseFloat(origem.lng)))
      temp.origemLng = "Longitude inválida";

    if (!destino.lat || isNaN(parseFloat(destino.lat)))
      temp.destinoLat = "Latitude inválida";

    if (!destino.lng || isNaN(parseFloat(destino.lng)))
      temp.destinoLng = "Longitude inválida";

    setErros(temp);
    return Object.keys(temp).length === 0; // true → sem erros
  };

  // ================================
  // GERAR ROTA ENTRE DOIS PONTOS
  // ================================
  const gerarRota = (e) => {
    e.preventDefault();

    // Se houver erros, ou serviço não existir, não continua
    if (!validarCampos() || !directionsServiceRef.current) return;

    const origemLatLng = {
      lat: parseFloat(origem.lat),
      lng: parseFloat(origem.lng),
    };

    const destinoLatLng = {
      lat: parseFloat(destino.lat),
      lng: parseFloat(destino.lng),
    };

    const request = {
      origin: origemLatLng,
      destination: destinoLatLng,
      travelMode: window.google.maps.TravelMode.DRIVING, // rota de carro
    };

    // Solicita rota ao Google Maps
    directionsServiceRef.current.route(request, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        directionsRendererRef.current.setDirections(result);
        mapInstanceRef.current.setCenter(origemLatLng);
      } else {
        alert("Não foi possível calcular a rota: " + status);
      }
    });
  };

  // ================================
  // OBTÉM LOCALIZAÇÃO ATUAL DO USUÁRIO
  // ================================
  const obterLocalizacaoAtual = () => {
    if (!navigator.geolocation) {
      alert("Geolocalização não é suportada pelo seu navegador");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        // Pega latitude e longitude
        const lat = pos.coords.latitude.toFixed(6);
        const lng = pos.coords.longitude.toFixed(6);

        // Preenche origem automaticamente
        setOrigem({ lat, lng });
        setErros({});

        // Atualiza o mapa para a posição do usuário
        if (mapInstanceRef.current) {
          const position = {
            lat: parseFloat(lat),
            lng: parseFloat(lng),
          };

          mapInstanceRef.current.setCenter(position);
          mapInstanceRef.current.setZoom(15);

          // Marca "você está aqui"
          new window.google.maps.Marker({
            position,
            map: mapInstanceRef.current,
            title: "Você está aqui!",
            animation: window.google.maps.Animation.DROP,
          });
        }
      },
      () => alert("Erro ao obter localização. Verifique as permissões.")
    );
  };

  // ================================
  // RENDERIZAÇÃO DA PÁGINA
  // ================================
  return (
    <>
      <Menu tipo="lateral" />

      <section className={styles.conteiner}>
        <h1 className={styles.titulo}>Geolocalização</h1>

        {/* FORM COM ORIGEM E DESTINO */}
        <div className={styles.formGrid}>

          {/* ---- ORIGEM ---- */}
          <div>
            <h3>Origem</h3>

            {/* Latitude */}
            <div className={styles.campo}>
              <label className={styles.label}>Latitude:</label>
              <input
                className={styles.input}
                value={origem.lat}
                onChange={(e) => setOrigem({ ...origem, lat: e.target.value })}
                placeholder="-23.550520"
              />
              {erros.origemLat && (
                <span className={styles.erroTexto}>{erros.origemLat}</span>
              )}
            </div>

            {/* Longitude */}
            <div className={styles.campo}>
              <label className={styles.label}>Longitude:</label>
              <input
                className={styles.input}
                value={origem.lng}
                onChange={(e) => setOrigem({ ...origem, lng: e.target.value })}
                placeholder="-46.633308"
              />
              {erros.origemLng && (
                <span className={styles.erroTexto}>{erros.origemLng}</span>
              )}
            </div>

            {/* Botão de pegar localização atual */}
            <button onClick={obterLocalizacaoAtual} className={styles.botaoLocalizacao}>
              📍 Usar Minha Localização
            </button>
          </div>

          {/* ---- DESTINO ---- */}
          <div>
            <h3>Destino</h3>

            <div className={styles.campo}>
              <label className={styles.label}>Latitude:</label>
              <input
                className={styles.input}
                value={destino.lat}
                onChange={(e) =>
                  setDestino({ ...destino, lat: e.target.value })
                }
                placeholder="-23.561414"
              />
              {erros.destinoLat && (
                <span className={styles.erroTexto}>{erros.destinoLat}</span>
              )}
            </div>

            <div className={styles.campo}>
              <label className={styles.label}>Longitude:</label>
              <input
                className={styles.input}
                value={destino.lng}
                onChange={(e) =>
                  setDestino({ ...destino, lng: e.target.value })
                }
                placeholder="-46.656139"
              />
              {erros.destinoLng && (
                <span className={styles.erroTexto}>{erros.destinoLng}</span>
              )}
            </div>
          </div>
        </div>

        {/* BOTÃO PRINCIPAL */}
        <button
          onClick={gerarRota}
          className={styles.botaoPrincipal}
          disabled={!mapLoaded}
        >
          {mapLoaded ? "🗺️ Gerar Rota" : "⏳ Carregando..."}
        </button>

        {/* MAPA */}
        <div ref={mapRef} className={styles.mapa} />

        {/* INSTRUÇÕES */}
        <div className={styles.instrucoes}>
          <h3>Como usar:</h3>
          <ul>
            <li>Clique em "Usar Minha Localização" para preencher origem automaticamente</li>
            <li>Ou preencha manualmente as coordenadas de origem e destino</li>
            <li>Clique em "Gerar Rota" para visualizar o caminho</li>
          </ul>

          <p><strong>Exemplos:</strong></p>
          <p>São Paulo: -23.550520, -46.633308</p>
          <p>Av. Paulista: -23.561414, -46.656139</p>
        </div>
      </section>
    </>
  );
}
