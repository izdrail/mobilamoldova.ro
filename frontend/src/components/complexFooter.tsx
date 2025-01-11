import data from '../../public/data.json';
import StoreDoubleColumn from '../components/store/storeDoubleColumn';

export default function ComplexFooter() {
  return (
    <>
      <footer>
        <div className="row">
          <div className="col-12 col-md-4">
            <h5 className="mt-5">Fabrica de Mobilă Moldova - Mobila Direct din Fabrică</h5>
            <div className="textwidget">
              <p>
                Cumpărați mobilă direct din fabrică la Fabrica de Mobilă Barlad Moldova. Evitați intermediarii și costurile ascunse, beneficiind de prețuri mai mici cu cel puțin 30% față de piață. Descoperiți gama noastră variată de mobilă personalizată pentru orice spațiu.
              </p>
              <p>
                <a
                  title="ANPC - Autoritatea Națională pentru Protecția Consumatorilor"
                  href="https://anpc.ro/ce-este-sal/"
                  target="_blank"
                  rel="noopener"
                >
                  Verificați mai multe despre drepturile dvs. la ANPC.
                </a>
              </p>
            </div>
          </div>
          <div className="col-12 col-md-8">
            <StoreDoubleColumn title={`Descoperă ${data.products[1].title} pentru mobilă de calitate`} />
          </div>
          <div className="col-12 mt-5 mb-lg-0 mb-4">
            <div className="copyright text-center text-sm text-body">
              Copyright © 
              <script>
                document.write(new Date().getFullYear());
              </script>
              &nbsp;Mobila Barlad Moldova - Designed by &nbsp;
              <a
                href="https://laravelcompany.com"
                title="Laravel Agency Essex - Soluții E-commerce pentru Mobilă"
                className="text-dark"
                target="_blank"
              >
                Laravel Agency Essex
              </a>.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
