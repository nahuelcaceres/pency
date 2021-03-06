import React from "react";
import {Stack, Flex, Text} from "@chakra-ui/core";

import {CartItem} from "../../types";

import CheckoutButton from "./CheckoutButton";

import {DrawerTitle, DrawerBody, DrawerFooter} from "~/ui/controls/Drawer";
import Button from "~/ui/controls/Button";
import {useTranslation, usePrice} from "~/i18n/hooks";
import {getCount, getTotal} from "~/cart/selectors";
import Stepper from "~/ui/inputs/Stepper";
import {getVariantsString, getVariantsPrice} from "~/product/selectors";

interface Props {
  items: CartItem[];
  onDecrease: (id: CartItem["id"]) => void;
  onIncrease: (id: CartItem["id"]) => void;
  onSubmit: () => Promise<void>;
  hasNextStep: boolean;
}

const Overview: React.FC<Props> = ({items, onIncrease, onDecrease, onSubmit, hasNextStep}) => {
  const [isLoading, toggleLoading] = React.useState(false);
  const t = useTranslation();
  const p = usePrice();
  const count = getCount(items);
  const total = getTotal(items);

  function handleSubmit() {
    toggleLoading(true);

    onSubmit().finally(() => toggleLoading(false));
  }

  function handleNext() {
    onSubmit();
  }

  function handleDecrease(id: CartItem["id"]) {
    onDecrease(id);
  }

  function handleIncrease(id: CartItem["id"]) {
    onIncrease(id);
  }

  return (
    <>
      <DrawerBody>
        <Stack spacing={6}>
          <DrawerTitle>
            {t("cart.yourOrder")} ({count})
          </DrawerTitle>
          <Stack shouldWrapChildren spacing={6}>
            {items.map(({id, product, count, variants}) => (
              <Flex key={id} alignItems="flex-start" justifyContent="space-between">
                <Flex alignItems="center" mr={2}>
                  <Stack spacing={0}>
                    <Text fontWeight={500}>{product.title}</Text>
                    {variants && <Text color="gray.600">{getVariantsString(variants)}</Text>}
                    <Stepper
                      marginTop={2}
                      value={count}
                      onDecrease={() => handleDecrease(id)}
                      onIncrease={() => handleIncrease(id)}
                    />
                  </Stack>
                </Flex>
                <Flex alignItems="center">
                  <Text fontWeight={500}>
                    {p((product.price + getVariantsPrice(variants)) * count)}
                  </Text>
                </Flex>
              </Flex>
            ))}
          </Stack>
        </Stack>
      </DrawerBody>
      <DrawerFooter borderTopColor="gray.100" borderTopWidth={1} marginTop={2}>
        <Stack spacing={4} width="100%">
          <Flex alignItems="center" fontSize="lg" fontWeight={500} justifyContent="space-between">
            <Text>{t("cart.estimatedTotal")}</Text>
            <Text>{p(total)}</Text>
          </Flex>
          {hasNextStep ? (
            <Button boxShadow="lg" size="lg" variantColor="primary" onClick={handleNext}>
              {t("common.next")}
            </Button>
          ) : (
            <CheckoutButton isLoading={isLoading} onClick={handleSubmit} />
          )}
        </Stack>
      </DrawerFooter>
    </>
  );
};

export default Overview;
