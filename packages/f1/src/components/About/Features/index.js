import React, { Component } from "react";
import { styled } from "frontity";

import ContainerLarge from "../../ContainerLarge";
import Item from "./Item";
import efficientCommunication from "./efficient-communication.png";
import seoStrategies from "./seo-strategies.png";
import successStrategy from "./success-strategy.png";
import breakpoints from "../../../constants/breakpoints";

const col1 = "col1";
const col2 = "col2";
const col3 = "col3";

const Grid = styled.ul`
  padding-left: 0;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-gap: 0 2rem;
  grid-template-areas: ${col1} ${col2} ${col3};

  @media (min-width: ${breakpoints.md}) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
  }
`;

export class Features extends Component {
  render() {
    return (
      <ContainerLarge>
        <Grid>
          <Item
            src={seoStrategies}
            alt="Estrategias Seo"
            title="Posicionamento web"
          >
            En Remarketingo aprenderas como sacar lo mejor de tu página web, sea
            esa blog o e-commerce. Con nuestras <strong>estrategias SEO</strong>{" "}
            podrás posicionar tus artículos en la primera pagina de Google.
          </Item>
          <Item
            src={efficientCommunication}
            alt="COMUNICACIÓN EFICAZ"
            title="Mejorar tu comunicación"
          >
            Tener un gran producto o grandes artículos en tu blog sin que nadie
            lo sepa no te ayudará a cumplir tus sueños. Aprenderás a crear
            contenido de calidad y <strong>comunicarlo con eficacia.</strong>
          </Item>
          <Item
            src={successStrategy}
            alt="ESTRATEGIA MARKETING DE ÉXITO"
            title="Estrategias Marketing"
          >
            Solo con una <strong>estrategia marketing</strong> bien planeada
            tendrás éxito en el mundo online. En Remarketingo encontrarás todo
            lo que necesites para desarollar una estrategia marketing exitosa.
          </Item>
        </Grid>
      </ContainerLarge>
    );
  }
}

export default Features;
