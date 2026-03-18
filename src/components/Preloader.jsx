export function Preloader({ loaded }) {
  return (
    <div id="js-preloader" className={`js-preloader${loaded ? ' loaded' : ''}`}>
      <div className="preloader-inner">
        <span className="dot"></span>
        <div className="dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}
