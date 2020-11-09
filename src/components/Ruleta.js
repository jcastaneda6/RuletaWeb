import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import { useEffect, useState } from 'react';


function Ruleta() {

    const baseUrl = "https://localhost:44384/api/ruleta";
    const [data, setData]=useState([]);
    const [modalInsertar, setModalInsertar]=useState(false);
    const [modalEditar, setModalEditar]=useState(false);
    const [modalEliminar, setModalEliminar]=useState(false);
    const [ruletaSeleccionado, setruletaSeleccionado]=useState({
      iD_RULETA:'',
      fecha:'',
      iD_ESTADO:'',
    })
    const handleChange=e=>{
      const {name,value}=e.target;
      setruletaSeleccionado({
        ...ruletaSeleccionado,
        [name]:value
      });
      console.log(ruletaSeleccionado);
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
      delete ruletaSeleccionado.iD_RULETA;
      delete ruletaSeleccionado.fecha;
      ruletaSeleccionado.iD_ESTADO = parseInt(ruletaSeleccionado.iD_ESTADO);
      await axios.post(baseUrl, ruletaSeleccionado)
      .then(response=>{
        setData(data.concat(response.data));
        abrirCerrarModalInsertar();
      }).catch(error=>{
        console.log(error);
      })
    }
  
    const peticionPut=async()=>{
      ruletaSeleccionado.iD_ESTADO = parseInt(ruletaSeleccionado.iD_ESTADO);
      await axios.put(baseUrl+"/"+ruletaSeleccionado.iD_RULETA, ruletaSeleccionado)
      .then(response=>{
        var respuesta=response.data;
        var dataAuxiliar=data;
        dataAuxiliar.map(ruleta=>{
          if(ruleta.iD_RULETA===ruletaSeleccionado.iD_RULETA){
            ruleta.fecha = respuesta.fecha;
            ruleta.iD_ESTADO = respuesta.iD_ESTADO;
          }
        })
        abrirCerrarModaEditar();
      }).catch(error=>{
        console.log(error);
      })
    }
  
    const peticionDelete=async()=>{
      await axios.delete(baseUrl+"/"+ruletaSeleccionado.iD_RULETA)
        .then(response=>{
          setData(data.filter(gestor=>gestor.iD_RULETA!==response.data));
          abrirCerrarModaEliminar();
      }).catch(error=>{
        console.log(error);
      })
    }
  
  
  const seleccionarRuleta =(ruleta, caso) =>{
    setruletaSeleccionado(ruleta);
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
        <h1>Ruleta</h1>
        <div className="form-group">
        <button className="btn btn-success" onClick={()=>abrirCerrarModalInsertar()}>Insertar nueva ruleta</button>
        </div>
        <br/>
        <table className="table table-bordered">
          <thead>
            <tr align="center">
            <th>ID</th>
            <th>FECHA</th>
            <th>ID_ESTADO</th>
            <th colSpan="2">ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {data.map(ruleta=>(
              <tr key={ruleta.iD_RULETA}>
                <td>{ruleta.iD_RULETA}</td>
                <td>{ruleta.fecha}</td>
                <td>{ruleta.iD_ESTADO}</td>
                <td align="center">
                  <button className="btn btn-primary" onClick={()=>seleccionarRuleta(ruleta, "Editar")}>Editar</button>
                  </td><td align="center">
                  <button className="btn btn-danger" onClick={()=>seleccionarRuleta(ruleta, "Eliminar")}>Eliminar</button>
                </td>
              </tr>
            ))
            }
          </tbody>
        </table>
        <Modal isOpen={modalInsertar}>
          <ModalHeader>Insertar ruleta</ModalHeader>
          <ModalBody>
            <div className="form-group">
            <label>Estado:</label>
              <br />
              <select name="iD_ESTADO" className="form-control"
                  value={ruletaSeleccionado && ruletaSeleccionado.iD_ESTADO}
                  onChange={handleChange} 
                >
                <option value="1">ACTIVA    </option>
                  <option value="2">CERRADA   </option>
                  <option value="3">FINALIZADA</option>
                  <option value="4">CANCELADA </option>
                </select>
              <br/>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={()=>peticionPost()}>Insertar</button>
            <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()} >Cancelar</button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={modalEditar}>
          <ModalHeader>Editar ruleta</ModalHeader>
          <ModalBody>
            <div className="form-group">
            <label>ID:</label>
              <br />
              <input type="text" className="form-control" value={ruletaSeleccionado && ruletaSeleccionado.iD_RULETA} name="iD_RULETA" readOnly/>            
              <label>Fecha:</label>
              <br />
              <input type="text" className="form-control" value={ruletaSeleccionado && ruletaSeleccionado.fecha} name="fecha" readOnly/>
              <label>Estado:</label>
              <br />
              <select name="iD_ESTADO" className="form-control"
                  value={ruletaSeleccionado && ruletaSeleccionado.iD_ESTADO}
                  onChange={handleChange} 
                >
                <option value="1">ACTIVA    </option>
                  <option value="2">CERRADA   </option>
                  <option value="3">FINALIZADA</option>
                  <option value="4">CANCELADA </option>
                </select>
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
          ¿Esta seguro de eliminar el gestor {ruletaSeleccionado && ruletaSeleccionado.nombre}?
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
  
  export default Ruleta;
  