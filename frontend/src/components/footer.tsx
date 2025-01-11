export default function Footer() {
  return (
    <>
      <footer className="footer pt-3">
        <div className="row align-items-center justify-content-lg-between">
          <div className="col-lg-6 mb-lg-0 mb-4">
            <div className="copyright text-center text-sm text-muted text-lg-start">
              Copyright ©{" "}
              <script>document.write(new Date().getFullYear())</script>
              &nbsp; Toate drepturile rezervate
              <a
                href="https://laravelcompany.com"
                className="text-dark ms-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                Laravel Company
              </a>
              .
            </div>
          </div>
          <div className="col-lg-6">
            <ul className="nav nav-footer justify-content-center justify-content-lg-end">
              <li className="nav-item">
                <a
                  href="/despre"
                  className="nav-link text-sm text-muted"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Despre Noi
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="/blog"
                  className="nav-link text-sm text-muted"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Blog
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="/termeni"
                  className="nav-link text-sm pe-0 text-muted"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Termeni
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Additional Footer Content */}
      <footer className="fusion-footer-widget-area fusion-widget-area">
        <div className="fusion-row">
          <div className="fusion-columns fusion-columns-4 fusion-widget-area">
            <div className="fusion-column col-lg-3 col-md-3 col-sm-3">
              <section
                id="text-2"
                className="fusion-footer-widget-column widget widget_text"
                style={{ borderStyle: "solid", borderColor: "transparent", borderWidth: "0px" }}
              >
                <h4 className="widget-title">Fabrica de mobilă barlad moldova</h4>
                <div className="textwidget">
                  <p>
                    La Mobila Barlad Moldova aveți posibilitatea de a comandă mobilă direct în fabrică, evitând astfel intermediari și costurile ascunse, având avantajul prețului care este mai mic cu cel puțin 30% față de prețul pieței.
                  </p>
                  <p>
                    <a href="https://anpc.ro/ce-este-sal/" target="_blank" rel="noopener noreferrer">
                      <img
                        decoding="async"
                        className="alignnone wp-image-6853 size-full"
                        src="https://artamobilei.ro/wp-content/uploads/2023/01/anpc-250x63-1.png.webp"
                        alt="ANPC"
                        width="250"
                        height="63"
                      />
                    </a>
                  </p>
                  <p>
                    <a
                      href="https://ec.europa.eu/consumers/odr"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        decoding="async"
                        className="alignnone wp-image-6852 size-full"
                        src="https://artamobilei.ro/wp-content/uploads/2023/01/sol-250x63-1.png.webp"
                        alt="SOL"
                        width="250"
                        height="63"
                      />
                    </a>
                  </p>
                </div>
              </section>
            </div>

            {/* Additional Sections */}
            <div className="fusion-column col-lg-3 col-md-3 col-sm-3">
              <section
                id="nav_menu-2"
                className="fusion-footer-widget-column widget widget_nav_menu"
              >
                <h4 className="widget-title">Legături utile</h4>
                <ul className="menu">
                  <li>
                    <a href="https://artamobilei.ro/despre-noi/">Despre noi</a>
                  </li>
                  <li>
                    <a href="https://artamobilei.ro/magazin/">Magazin</a>
                  </li>
                  <li>
                    <a href="https://artamobilei.ro/livrare/">Livrare</a>
                  </li>
                  <li>
                    <a href="https://artamobilei.ro/faq/">Întrebări frecvente</a>
                  </li>
                  <li>
                    <a href="https://artamobilei.ro/blog/">Blog</a>
                  </li>
                  <li>
                    <a href="https://artamobilei.ro/contact/">Contact</a>
                  </li>
                  <li>
                    <a href="https://artamobilei.ro/termeni-si-conditii/">
                      Termeni și condiții
                    </a>
                  </li>
                  <li>
                    <a href="https://artamobilei.ro/politica-de-confidentialitate/">
                      Politica de confidențialitate
                    </a>
                  </li>
                </ul>
              </section>
            </div>
            <div className="fusion-column col-lg-3 col-md-3 col-sm-3">
              <section
                id="nav_menu-3"
                className="fusion-footer-widget-column widget widget_nav_menu"
              >
                <h4 className="widget-title">Categorii de mobilier</h4>
                <ul className="menu">
                  <li>
                    <a href="/mobila-de-bucatarie/">
                      Mobila bucătărie
                    </a>
                  </li>
                  <li>
                    <a href="/mobila-de-dormitor/">
                      Mobila dormitor
                    </a>
                  </li>
                  <li>
                    <a href="paturi-tapitate/">
                      Paturi tapitate
                    </a>
                  </li>
                  <li>
                    <a href="mobila-de-living/">
                      Mobila living
                    </a>
                  </li>
                  <li>
                    <a href="mobila-copii/">
                      Mobila copii
                    </a>
                  </li>
                  <li>
                    <a href="mobila-pentru-hol/">
                      Mobila hol
                    </a>
                  </li>
                  <li>
                    <a href="birou-si-camera-de-lucru/">
                      Mobila birou
                    </a>
                  </li>
                  <li>
                    <a href="mobila-baie/">
                      Mobila baie
                    </a>
                  </li>
                </ul>
              </section>
            </div>
            <div className="fusion-column col-lg-3 col-md-3 col-sm-3">
              <section id="text-3" className="fusion-footer-widget-column widget widget_text">
                <h4 className="widget-title">Contact Arta Mobilei București</h4>
                <p>
                  Fundatura Elena Doamana 2 nr 14, Barlad, Vaslui.
                  <br />
                  <a href="tel:0769297786">0769.297.786</a>
                  <br />
                  <a href="tel:0725473105">0725.473.105</a>
                  <br />
                  <a href="tel:0314250673">0314.250.673</a>
                  <br />
                  <a href="mailto:marketing@mobilamoldova.ro">marketing@mobilamoldova.ro</a>
                </p>
                <p>
                  <strong>Program</strong>
                  <br />
                  Luni – Vineri: 10:00 – 18:00
                  <br />
                  Sâmbătă: 10:00 – 14:00
                  <br />
                  Duminică: Închis
                </p>
              </section>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
