export default function Service() {
  return (
    <div className="service">
      <h3 className="service__title">Service</h3>
      <div className="row">
        <div className="col-md-4">
          <div className="service__item">
            <img src="/images/web.png" alt="service" />
            <h4>Frontend development</h4>
          </div>
        </div>
        <div className="col-md-4">
          <div className="service__item">
            <img src="/images/mobile.png" alt="service" />
            <h4>Mobile development</h4>
          </div>
        </div>
        <div className="col-md-4">
          <div className="service__item">
            <img src="/images/landing.png" alt="service" />
            <h4>Landing page build</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
