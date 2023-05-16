import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Table,
  Container,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  FormGroup
} from 'reactstrap';

const data = [
  { id: 1, personaje: "Naruto", anime: "Naruto" },
  { id: 2, personaje: "Naruto", anime: "Naruto" },
  { id: 3, personaje: "Naruto", anime: "Naruto" },
  { id: 4, personaje: "Naruto", anime: "Naruto" },
  { id: 5, personaje: "Naruto", anime: "Naruto" },
  { id: 6, personaje: "Naruto", anime: "Naruto" },
];

class App extends React.Component {
  state = {
    data: data,
    form:{
      id:'',
      personaje:'',
      anime:'',
    },
    modalInsertar: false,
    modalEditar: false,
  };

  handleChange = e => {
    this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value,
      }
    });
  }
  mostrarModalInsertar=()=>{
    this.setState({ modalInsertar: true });
  }
  ocultarModalInsertar=()=>{
    this.setState({ modalInsertar: false });
  }
  mostrarModalEditar=(elemento)=>{
    this.setState({ modalEditar: true,
                    form: elemento,  });
  }
  ocultarModalEditar=()=>{
    this.setState({ modalEditar: false });
  }
  insertar = () =>{
    var pValor = { ...this.state.form };
    pValor.id = this.state.data.length+1;
    var pLista = this.state.data;
    pLista.push(pValor);
    this.setState({ data: pLista,
                    modalInsertar: false  });
  }
  fEditar = (elemento) =>{
    var pCont = 0;
    var pLista =this.state.data;
    pLista.map((registro)=>{
      if(elemento.id==registro.id){
        pLista[pCont].personaje = elemento.personaje;
        pLista[pCont].anime = elemento.anime;
      }
      pCont++;
    });
    this.setState({ data: pLista,
                    modalEditar: false })
  }
  fEliminar = (elemento) =>{
    if(window.confirm("Esta seguro que desea eliminar el registro No. "+elemento.id+"?"))
    {
      var pCont = 0;
      var pLista =this.state.data;
      pLista.map((registro)=>{
        if(elemento.id==registro.id){
          pLista.splice(pCont, 1);
        }
        pCont++;
      });
      
    };
    this.setState({ data: pLista })
  }
  render() {
    return (
      <>
        <Container>
          <br />
          <Button color='success' onClick={()=>this.mostrarModalInsertar()}>Insertar</Button>
          <br /><br />
          <Table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Personaje</th>
                <th>Anime</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.data.map((elemento) => (
                  <tr>
                    <td>{elemento.id}</td>
                    <td>{elemento.personaje}</td>
                    <td>{elemento.anime}</td>
                    <td><Button color='primary' onClick={()=>this.mostrarModalEditar(elemento)}>Editar</Button>{"  "}
                      <Button color='danger' onClick={()=>this.fEliminar(elemento)}>Eliminar</Button></td>
                  </tr>
                ))
              }

            </tbody>
          </Table>
        </Container>
        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div><h3>Insertar registro</h3></div>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>Id:</label>
              <input className='form-control'
                readOnly
                type='text'
                value={this.state.data.length+1}
              />
            </FormGroup>
            <FormGroup>
              <label>Personaje:</label>
              <input className='form-control'
                name='personaje'
                type='text'
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>Anime:</label>
              <input className='form-control'
                name='anime'
                type='text'
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={()=>this.insertar()}>Insertar</Button>{" "}
            <Button color='danger' onClick={()=>this.ocultarModalInsertar()}>Cancelar</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalEditar}>
          <ModalHeader>
            <div><h3>Editar registro</h3></div>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>Id:</label>
              <input className='form-control'
                readOnly
                type='text'
                value={this.state.form.id}
              />
            </FormGroup>
            <FormGroup>
              <label>Personaje:</label>
              <input className='form-control'
                name='personaje'
                type='text'
                onChange={this.handleChange}
                value={this.state.form.personaje}
              />
            </FormGroup>
            <FormGroup>
              <label>Anime:</label>
              <input className='form-control'
                name='anime'
                type='text'
                onChange={this.handleChange}
                value={this.state.form.anime}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={()=>this.fEditar(this.state.form)}>Insertar</Button>{" "}
            <Button color='danger' onClick={()=>this.ocultarModalEditar()}>Cancelar</Button>
          </ModalFooter>
        </Modal>
      </>
    )
  }
}

/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/

export default App;
