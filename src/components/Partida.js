import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import { useEffect, useState } from 'react';




function Partida() {

    const baseUrl = "https://localhost:44384/api/Partida";
    const [data, setData]=useState([]);
    const [modalInsertar, setModalInsertar]=useState(false);
    const [modalEditar, setModalEditar]=useState(false);
    const [modalEliminar, setModalEliminar]=useState(false);
    const [partidaSeleccionado, setpartidaSeleccionado]=useState({
      iD_PARTIDA:'',
      iD_RULETA:'',
      iD_JUGADOR:'',
    })
    const handleChange=e=>{
      const {name,value}=e.target;
      setpartidaSeleccionado({
        ...partidaSeleccionado,
        [name]:value
      });
      console.log(partidaSeleccionado);
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
      delete partidaSeleccionado.iD_PARTIDA;
      partidaSeleccionado.iD_RULETA = parseInt(partidaSeleccionado.iD_RULETA);
      partidaSeleccionado.iD_JUGADOR = parseInt(partidaSeleccionado.iD_JUGADOR);
      await axios.post(baseUrl, partidaSeleccionado)
      .then(response=>{
        setData(data.concat(response.data));
        abrirCerrarModalInsertar();
      }).catch(error=>{
        console.log(error);
      })
    }
  
    const peticionPut=async()=>{
      partidaSeleccionado.iD_RULETA = parseInt(partidaSeleccionado.iD_RULETA);
      partidaSeleccionado.iD_JUGADOR = parseInt(partidaSeleccionado.iD_JUGADOR);
      await axios.put(baseUrl+"/"+partidaSeleccionado.iD_PARTIDA, partidaSeleccionado)
      .then(response=>{
        var respuesta=response.data;
        var dataAuxiliar=data;
        dataAuxiliar.map(partida=>{
          if(partida.iD_PARTIDA===partidaSeleccionado.iD_PARTIDA){
            partida.iD_RULETA = respuesta.iD_RULETA;
            partida.iD_JUGADOR = respuesta.iD_JUGADOR;
          }
        })
        abrirCerrarModaEditar();
      }).catch(error=>{
        console.log(error);
      })
    }
  
    const peticionDelete=async()=>{
      await axios.delete(baseUrl+"/"+partidaSeleccionado.iD_PARTIDA)
        .then(response=>{
          setData(data.filter(partida=>partida.iD_PARTIDA!==response.data));
          abrirCerrarModaEliminar();
      }).catch(error=>{
        console.log(error);
      })
    }
  
  
  const seleccionarRuleta =(partida, caso) =>{
    setpartidaSeleccionado(partida);
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
        <h1>Partida</h1>
        <div className="form-group">
        <button className="btn btn-success" onClick={()=>abrirCerrarModalInsertar()}>Insertar un partida</button>
        </div>
        <br/>
        <table className="table table-bordered">
          <thead>
          <tr align="center">
            <th>ID</th>
            <th>RULETA</th>
            <th>GANADOR</th>
            <th colSpan="2">ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {data.map(partida=>(
              <tr key={partida.iD_PARTIDA}>
                <td>{partida.iD_PARTIDA}</td>
                <td>{partida.iD_RULETA}</td>
                <td>{partida.iD_JUGADOR}</td>
                <td align="center">
                  <button className="btn btn-primary" onClick={()=>seleccionarRuleta(partida, "Editar")}>Editar</button>
                  </td><td align="center">                  
                  <button className="btn btn-danger" onClick={()=>seleccionarRuleta(partida, "Eliminar")}>Eliminar</button>
                </td>
              </tr>
            ))
            }
          </tbody>
        </table>
        <Modal isOpen={modalInsertar}>
          <ModalHeader>Insertar partida</ModalHeader>
          <ModalBody>
            <div className="form-group">
            <label>Ruleta:</label>
            <br />
              <input type="text" className="form-control"  name="iD_RULETA" onChange={handleChange}/>
              <br/>
              <label>Ganador</label>
            <br />
              <input type="numeric" className="form-control"  name="iD_JUGADOR" onChange={handleChange}/>
              <br />                    
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={()=>peticionPost()}>Insertar</button>
            <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()} >Cancelar</button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={modalEditar}>
          <ModalHeader>Editar partida</ModalHeader>
          <ModalBody>
            <div className="form-group">
            <label>ID:</label>
              <br />
              <input type="text" className="form-control" value={partidaSeleccionado && partidaSeleccionado.iD_PARTIDA} name="iD_PARTIDA" readOnly/>            
              <label>Ruleta:</label>
              <br />
              <input type="text" className="form-control" value={partidaSeleccionado && partidaSeleccionado.iD_RULETA} name="iD_RULETA" onChange={handleChange}/>
              <label>Ganador:</label>
              <br />
              <input type="text" className="form-control" value={partidaSeleccionado && partidaSeleccionado.iD_JUGADOR} name="iD_JUGADOR" onChange={handleChange}/>            
              <br/>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={()=>peticionPut()}>Editar</button>
            <button className="btn btn-danger" onClick={()=>abrirCerrarModaEditar()} >Cancelar</button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={modalEliminar}>
          <ModalHeader>Eliminar partida</ModalHeader>
          <ModalBody>
          ¿Esta seguro de eliminar la partida {partidaSeleccionado && partidaSeleccionado.nombre}?
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
  
  export default Partida;
  