import React, { Component } from 'react';
import './App.css';
import Logo from './Assets/img/Logo_Tecnologia_600x150.png'
import Logo2 from './Assets/img/tecnologia-logo.png'
import Url from './Services/apiService'





class Login extends Component {

    constructor() {
        super();
        this.state = {
            user: "",
            senha: "",
            userLogado: "",
            erro:""

        }
    }

    componentDidMount() {
        document.title = "SUPER SMZ 2 SENAI 2021"
        this.setState({erro:""})
        
    }


    atualizaEstadoUser(event) {
        this.setState({ user: event.target.value });
    }
    atualizaEstadoSenha(event) {
        this.setState({ senha: event.target.value });
    }





    realizaLogin(event) {
        event.preventDefault();
        let user = {

            jsonrpc: "2.0",
            method: "user.login",
            params: {
                user: this.state.user,
                password: this.state.senha
            },
            id: 1,
            auth: null
        }
        fetch(Url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        }
        )
            .then(response => response.json())
            .then(data => {
                this.setState({ userLogado: data.token })
                //Se data.error  for false, redireciona o usuário e armazena no local storage a data token
                if (!data.error) {
                    this.setState({ erro: "Aguarde" })   
                    localStorage.setItem("usuario-blocktime", data.token);
                    this.props.history.push('/Hostgroups');
                    console.log(data)
                    
                }
                else this.setState({ erro: "Usuário ou senha incorretos!" })  

               console.log(this.state.erro)
                
            })
              
    }

acessarSite(){
  
  this.props.history.push('/Site')
}

acessarSistema(){
  this.props.history.push('/Login')
}





  render() {
        return (
            <section id="login">
                <div className="caixa">
                    <img src={Logo} alt="Logo da empresa SMZ" className="image1" />
                    <img src={Logo2} alt="Logo da empresa SMZ" className="image2" />

                    <button className="login-button" onClick={this.acessarSistema.bind(this)}  {...this.state.isLoading ? "disabled" : ""}>
                        
                        {this.state.isLoading ? "Carregando..." : "Acessar o Sistema"}</button>

                   <button className="login-button" onClick = {this.acessarSite.bind(this)}  {...this.state.isLoading ? "disabled" : ""}>
                        
                        {this.state.isLoading ? "Carregando..." : "Site SMZ"}</button>
                   
                   
                   
                    <h2 style={{color:"red", fontSize: "1.5em", margin: "3%" }}>{this.state.erro}</h2>
                </div>
                <p>Powered by SUPER SMZ 2 - SENAI 2021 </p>
            </section>)
            
    }







}

export default Login;