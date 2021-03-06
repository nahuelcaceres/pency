import React from "react";
import {Stack, Box, Flex, useDisclosure} from "@chakra-ui/core";

import ProductDrawer from "../../components/ProductDrawer";
import {useFilteredProducts, useProductActions, useProductCategories} from "../../hooks";
import {Product} from "../../types";
import ProductsList from "../../components/ProductsList";

import {groupBy} from "~/selectors/group";
import PlusIcon from "~/ui/icons/Plus";
import IconButton from "~/ui/controls/IconButton";
import Content from "~/ui/structure/Content";
import NoResults from "~/ui/feedback/NoResults";
import {useTranslation} from "~/i18n/hooks";
import EditIcon from "~/ui/icons/Edit";
import ProductsBulkEditDrawer from "~/product/components/ProductsBulkEditDrawer";
import {useTenant} from "~/tenant/hooks";

const AdminScreen: React.FC = () => {
  const [selected, setSelected] = React.useState<Partial<Product> | undefined>(undefined);
  const {flags} = useTenant();
  const {products, filters} = useFilteredProducts();
  const {update, remove, create, bulk} = useProductActions();
  const categories = useProductCategories();
  const productsByCategory = groupBy(products, (product) => product.category);
  const t = useTranslation();
  const {isOpen: isBulkOpen, onOpen: onBulkOpen, onClose: onBulkClose} = useDisclosure();

  async function handleSubmit(product: Product) {
    if (product.id) {
      await update(product);
    } else {
      await create(product);
    }

    closeProductDrawer();
  }

  async function handleBulkSubmit(products: Product[]) {
    await bulk.update(products);

    onBulkClose();
  }

  function onCreate() {
    setSelected({
      available: true,
      image: "",
      options: [],
    });
  }

  function onProductEdit(product: Product) {
    setSelected(product);
  }

  function closeProductDrawer() {
    setSelected(undefined);
  }

  return (
    <>
      <Flex direction="column" height="100%" marginTop={4}>
        <Box flex={1}>
          <Flex alignItems="center" data-test-id="filters">
            <Content>
              <Flex alignItems="center" justifyContent="space-between" paddingX={4} width="100%">
                {filters}
                <Stack isInline marginLeft={4} spacing={2}>
                  {flags?.includes("bulk") && (
                    <IconButton
                      isCollapsable
                      data-test-id="edit-product"
                      leftIcon={EditIcon}
                      size="md"
                      onClick={onBulkOpen}
                    >
                      Editar en lote
                    </IconButton>
                  )}
                  <IconButton
                    isCollapsable
                    data-test-id="add-product"
                    leftIcon={PlusIcon}
                    size="md"
                    variantColor="primary"
                    onClick={onCreate}
                  >
                    {t("common.add")}
                  </IconButton>
                </Stack>
              </Flex>
            </Content>
          </Flex>
          <Content padding={4}>
            <Box width="100%">
              {products.length ? (
                <Stack spacing={6}>
                  {productsByCategory.map(([category, products]) => (
                    <Box key={category} id={category}>
                      <ProductsList
                        products={products}
                        title={category}
                        width="100%"
                        onEdit={onProductEdit}
                        onRemove={remove}
                      />
                    </Box>
                  ))}
                </Stack>
              ) : (
                <NoResults>{t("admin.empty")}</NoResults>
              )}
            </Box>
          </Content>
        </Box>
      </Flex>
      <ProductDrawer
        categories={categories}
        defaultValues={selected}
        isOpen={Boolean(selected)}
        onClose={closeProductDrawer}
        onSubmit={handleSubmit}
      />
      <ProductsBulkEditDrawer
        defaultValues={products}
        isOpen={isBulkOpen}
        onClose={onBulkClose}
        onSubmit={handleBulkSubmit}
      />
    </>
  );
};

export default AdminScreen;
