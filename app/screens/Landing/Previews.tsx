import React from "react";
import {Stack, Text, Box} from "@chakra-ui/core";

import Preview from "./Preview";
import Content from "./Content";

const Previews = () => (
  <Box
    as="section"
    backgroundColor="teal.50"
    paddingBottom={{base: 12, sm: 24}}
    paddingTop={{base: 16, sm: 24}}
    textAlign={{base: "left", sm: "center"}}
  >
    <Content>
      <Stack spacing={12}>
        <Stack alignItems="center" spacing={2}>
          <Text
            as="h3"
            color="gray.900"
            fontSize={["2xl", "3xl", "3xl", "4xl", "5xl"]}
            fontWeight={500}
            marginBottom={{base: 4, sm: 0}}
          >
            Versátil, para todo tipo de negocios
          </Text>
          <Text
            as="h4"
            color="gray.500"
            fontSize={{base: 18, sm: 20}}
            maxWidth={{base: "auto", sm: "3xl"}}
            textAlign={["left", "center"]}
          >
            Independientemente del rubro, tu tienda Pency se ajusta a vos y tus productos, además de
            ofrecer una experiencia de compra simple y agradable a tus clientes.
          </Text>
        </Stack>
        <Stack
          isInline
          shouldWrapChildren
          alignItems="center"
          as="section"
          overflowX="auto"
          paddingY={8}
          spacing={12}
        >
          <Preview
            image="/assets/landing/store-2.jpg"
            store="fosforo.cocina"
            title="Fosforo Cocina"
          />
          <Preview image="/assets/landing/store-3.jpg" store="hardymarket" title="Hardy Market" />
          <Preview image="/assets/landing/store-1.jpg" store="faithdecoarg" title="Faith" />
          <Preview
            image="/assets/landing/store-0.jpg"
            store="tiendabastamaria"
            title="Basta María"
          />
        </Stack>
      </Stack>
    </Content>
  </Box>
);

export default Previews;
