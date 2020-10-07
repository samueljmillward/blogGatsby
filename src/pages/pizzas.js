/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { graphql } from 'gatsby';
import PizzaList from '../components/PizzaList';
import Layout from '../components/Layout';

export default function PizzasPage({ data }) {
  const pizzas = data.pizzas.nodes;
  return (
    <Layout>
      <PizzaList pizzas={pizzas} />
    </Layout>
  );
}

export const query = graphql`
  query PizzaQuery {
    pizzas: allSanityPizza {
      nodes {
        name
        id
        slug {
          current
        }
        toppings {
          id
          name
        }
        image {
          asset {
            fixed(width: 600, height: 200) {
              ...GatsbySanityImageFixed
            }
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
