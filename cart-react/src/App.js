import "./App.css"
import Convert from "./screens/Convert";
import Carts from "./screens/Carts";



function App() {
  return (
      <section className='container pt-5'>
        <div className="row justify-content-md-center">
          <div className="card  shadow col-md-6 p-5 pe-0">
            <div className="card-header bg-white border-bottom-0">
              <h3 className="">Пополнить банковской картой</h3>
            </div>
            <div className="card-body">
              <div className="row">
                <Convert/>
              </div>
              <Carts/>
            </div>
          </div>
        </div>
      </section>
  );
}

export default App;
