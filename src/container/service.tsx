export default function Service() {
  return (
    <div className="service__wrap">
      <div className="service">
        <h3 className="service__title">Service</h3>
        <div className="row">
          <div className="col-md-4">
            <div className="service__item">
              <img src="/images/web.png" alt="service" />
              <h4>Web development</h4>
              <p>
                I have been working as a web developer for 10 years. I have
                worked with many technologies, such as React, Vue, Angular,
                Node, Express, NestJS, Laravel, and so on.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="service__item">
              <img src="/images/mobile.png" alt="service" />
              <h4>Mobile development</h4>
              <p>
                I have been working as a mobile developer for 5 years. I have
                worked with many technologies, such as React Native, Flutter,
                and so on.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="service__item">
              <img src="/images/landing.png" alt="service" />
              <h4>Landing page build</h4>
              <p>
                I can build a landing page for you. I have built many landing
                pages for many clients.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
