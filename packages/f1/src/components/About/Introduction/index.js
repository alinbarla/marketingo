import React, { Component } from "react";
import { styled } from "frontity";

import { containerStyles } from "../../Container";
import Caption from "../Caption";
import Link from "../../link";
import weddingImage from "./Wedding.jpg";

const Container = styled.section`
  ${containerStyles}
  margin-top: 3.25rem;
  margin-bottom: 3rem;
  padding: 0 5%;
`;

const Body = styled.div`
  text-align: center;
`;

const Figure = styled.figure`
  margin: 2.75rem auto 0;
  max-width: 12.9375rem;
`;

const Image = styled.img`
  border-radius: 0.625rem;
`;

const Title = styled.h2`
  margin-bottom: 1.25rem;
  margin-top: 2.5rem;
`;

export class Introduction extends Component {
  render() {
    return (
      <Container>
        <Body>
          <Figure>
            <Image src={weddingImage} alt="Our wedding" />
            <Caption>Nuestra Boda</Caption>
          </Figure>
          <Title>
            Alin Barla – Emprendedor Digital con más de 10 años de experiencia
          </Title>
          <p>
            <span>
              Soy Alin Barla, nací en Rumanía y recentiemente me case con mi
              preciosa esposa mexicana, Selene. A su lado, he viajado por todo
              el mundo. Es más, hemos vivido durante seis años en Italia y,
              ahora, estamos empezando una vida en Noruega. De hecho, somos
              amantes de los viajes y las aventuras.
            </span>
            <strong>
              {" "}
              Por esta razón, decidí ser emprendedor digital y lanzar mi propio
              <em> nogocio online</em>
            </strong>
            <span>
              . Gracias a su éxito, podemos permitirnos disfrutar de la vida sin
              tener que preocuparnos más por nuestra situación económica.
              ¿Buscas lo mismo?
            </span>
            <Link link="/blog"> Aqui estamos</Link>
            <span> para ayudarte.</span>
          </p>
        </Body>
      </Container>
    );
  }
}

export default Introduction;
