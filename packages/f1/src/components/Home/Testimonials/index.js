import React, { Component } from "react";

import Container from "../../Container";
import Item from "./Item";

import roberto from "./Roberto-Jimenez-Servicios-de-Traduccion-150x150.jpg";
import maria from "./Maria-del-Carmen-Torres-e-commerce-productos-de-belleza-150x150.jpg";

export class Testimonials extends Component {
  render() {
    return (
      <Container>
        <Item
          author={{
            name: "Roberto Jiménez",
            title: "Servicios de traduccion",
            image: roberto,
          }}
        >
          «Tenía una página web para mi negocio online, pero no conseguía atraer
          clientes. Sin embargo, contacté con Alin y me enseñó a sacar lo mejor
          mi web. Ahora, gracias a sus consejos, mi web está mejor posicionada.
          Además, me escriben muy a menudo. ¡Gracias, Remarketingo!»
        </Item>
        <Item
          author={{
            name: "María del Carmen Torres",
            title: "E-commerce productos de belleza",
            image: maria,
          }}
        >
          «Desde siempre había querido vender mis productos de belleza caseros
          por internet, pero ni siquiera sabía cómo empezar. Así que busqué
          ayuda y encontré Remarketingo. ¡Ha sido una ayuda estupenda! Me ha
          mostrado cómo crear mi negocio online paso por paso. Y hoy en día,
          vendo mis productos por todo el país»
        </Item>
      </Container>
    );
  }
}

export default Testimonials;
