import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import { useEffect, useState } from 'react';


function Jugador() {

    const baseUrl = "https://localhost:44384/api/Jugador";
    const [data, setData]=useState([]);
    const [modalInsertar, setModalInsertar]=useState(false);
    const [modalEditar, setModalEditar]=useState(false);
    const [modalEliminar, setModalEliminar]=useState(false);
    const [jugadorSeleccionado, setjugadorSeleccionado]=useState({
      iD_JUGADOR:'',
      nombre:'',
      apuesta:'',
      numero:'',
    })
    const handleChange=e=>{
      const {name,value}=e.target;
      setjugadorSeleccionado({
        ...jugadorSeleccionado,
        [name]:value
      });
      console.log(jugadorSeleccionado);
    }
  
  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }
  
  const abrirCerrarModaEditar=()=>{
    setModalEditar(!modalEditar);
  }
  
  const abrirCerrarModaEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }
  
    const peticionGet=async()=>{
      await axios.get(baseUrl)
      .then(response=>{
        setData(response.data);
      }).catch(error=>{
        console.log(error);
      })
    }
  
    const peticionPost=async()=>{
      delete jugadorSeleccionado.iD_JUGADOR;
      jugadorSeleccionado.numero = parseInt(jugadorSeleccionado.numero);
      jugadorSeleccionado.apuesta = parseFloat(jugadorSeleccionado.apuesta);
      await axios.post(baseUrl, jugadorSeleccionado)
      .then(response=>{
        setData(data.concat(response.data));
        abrirCerrarModalInsertar();
      }).catch(error=>{
        console.log(error);
      })
    }
  
    const peticionPut=async()=>{
      jugadorSeleccionado.numero = parseInt(jugadorSeleccionado.numero);
      jugadorSeleccionado.apuesta = parseFloat(jugadorSeleccionado.apuesta);
      await axios.put(baseUrl+"/"+jugadorSeleccionado.iD_JUGADOR, jugadorSeleccionado)
      .then(response=>{
        var respuesta=response.data;
        var dataAuxiliar=data;
        dataAuxiliar.map(jugador=>{
          if(jugador.iD_JUGADOR===jugadorSeleccionado.iD_JUGADOR){
            jugador.nombre = respuesta.nombre;
            jugador.apuesta = respuesta.apuesta;
            jugador.numero = respuesta.numero;
          }
        })
        abrirCerrarModaEditar();
      }).catch(error=>{
        console.log(error);
      })
    }
  
    const peticionDelete=async()=>{
      await axios.delete(baseUrl+"/"+jugadorSeleccionado.iD_JUGADOR)
        .then(response=>{
          setData(data.filter(jugador=>jugador.iD_JUGADOR!==response.data));
          abrirCerrarModaEliminar();
      }).catch(error=>{
        console.log(error);
      })
    }
  
  
  const seleccionarRuleta =(jugador, caso) =>{
    setjugadorSeleccionado(jugador);
    (caso==="Editar")?
    abrirCerrarModaEditar(): abrirCerrarModaEliminar();
  }
  
    useEffect(()=>{
      peticionGet();
    },[])
    return (
      <div class="container">
      <div class="jumbotron">
        <br/>
        <h1>Jugador</h1>
        <div className="form-group">
        <button className="btn btn-success" onClick={()=>abrirCerrarModalInsertar()}>Insertar un jugador</button>
        </div>
        <br/>
        <table className="table table-bordered">
          <thead>
          <tr align="center">
            <th>ID</th>
            <th>NOMBRE</th>
            <th>APUESTA</th>
            <th>NUMERO</th>
            <th colSpan="2">ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {data.map(jugador=>(
              <tr key={jugador.iD_JUGADOR}>
                <td>{jugador.iD_JUGADOR}</td>
                <td>{jugador.nombre}</td>
                <td>{jugador.apuesta}</td>
                <td>{jugador.numero}</td>
                <td align="center">
                  <button className="btn btn-primary" onClick={()=>seleccionarRuleta(jugador, "Editar")}>Editar</button>
                  </td><td align="center">                  
                  <button className="btn btn-danger" onClick={()=>seleccionarRuleta(jugador, "Eliminar")}>Eliminar</button>
                </td>
              </tr>
            ))
            }
          </tbody>
        </table>
        <Modal isOpen={modalInsertar}>
          <ModalHeader>Insertar jugador</ModalHeader>
          <ModalBody>
            <div className="form-group">
            <label>nombre:</label>
            <br />
              <input type="text" className="form-control"  name="nombre" onChange={handleChange}/>
              <br/>
              <label>Apuesta(max US10.000):</label>
            <br />
              <input type="numeric" className="form-control"  name="apuesta" onChange={handleChange}/>
              <br/> 
              <label>Número(0-36):</label>
            <br />
              <input type="numeric" className="form-control"  name="numero" onChange={handleChange}/>
              <br />                    
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={()=>peticionPost()}>Insertar</button>
            <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()} >Cancelar</button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={modalEditar}>
          <ModalHeader>Editar jugador</ModalHeader>
          <ModalBody>
            <div className="form-group">
            <label>ID:</label>
              <br />
              <input type="text" className="form-control" value={jugadorSeleccionado && jugadorSeleccionado.iD_JUGADOR} name="iD_JUGADOR" readOnly/>            
              <label>nombre:</label>
              <br />
              <input type="text" className="form-control" value={jugadorSeleccionado && jugadorSeleccionado.nombre} name="nombre" onChange={handleChange}/>
              <label>Apuesta(max US10.000):</label>
              <br />
              <input type="text" className="form-control" value={jugadorSeleccionado && jugadorSeleccionado.apuesta} name="apuesta" onChange={handleChange}/>
              <label>Número(0-36):</label>
              <br />
              <input type="text" className="form-control" value={jugadorSeleccionado && jugadorSeleccionado.numero} name="numero" onChange={handleChange}/>              
              <br/>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={()=>peticionPut()}>Editar</button>
            <button className="btn btn-danger" onClick={()=>abrirCerrarModaEditar()} >Cancelar</button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={modalEliminar}>
          <ModalHeader>Eliminar gestor</ModalHeader>
          <ModalBody>
          ¿Esta seguro de eliminar el gestor {jugadorSeleccionado && jugadorSeleccionado.nombre}?
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={()=>peticionDelete()}>Si</button>
            <button className="btn btn-danger" onClick={()=>abrirCerrarModaEliminar()} >No</button>
          </ModalFooter>
        </Modal>        
      </div>
      </div>
    );
  }
  
  export default Jugador;
  