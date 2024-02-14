import { Button, Icon, Input, Wrap, WrapItem } from "@chakra-ui/react";
import { Text, Box, Center, Flex, Spacer } from "@chakra-ui/layout";
import {
    // Modal,
    // ModalCloseButton,
    // ModalContent,
    // ModalHeader,
    // ModalOverlay,
    // ModalFooter,
    // ModalBody,
    Table,
    Th,
    Tr,
    Tbody,
    Thead,
} from "@chakra-ui/modal";
import { Search2Icon } from "@chakra-ui/icons";
import { FaArrowDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/stores/store";
import { useEffect, useState } from "react";
import { ItemDetailInterface, liveProductPrice } from "../../types/DataTypes";
import { ItemListSellerGet } from "../../api/Itemlist";
import ProductTable from "./liveproduct/ProductTable";

interface Typeprops {
    isSelected: boolean;
    isSelectedState: (value: boolean) => void;
    products: Array<ItemDetailInterface>;
    setProducts: React.Dispatch<React.SetStateAction<ItemDetailInterface[]>>;
    selectedProductId: Map<number, liveProductPrice>;
    setSelectedProductId: React.Dispatch<
        React.SetStateAction<Map<number, liveProductPrice>>
    >;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    size: number;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LiveItemAdd({
    isSelected,
    isSelectedState,
    products,
    setProducts,
    selectedProductId,
    setSelectedProductId,
    page,
    setPage,
    size,
    isOpen,
    setIsOpen,
    currentGetProducts,
}: Typeprops) {
    console.log(currentGetProducts);
    const accessToken = useSelector(
        (state: RootState) => state.user.accessToken
    );
    const [scrollButtonHidden, setScrollButtonHidden] =
        useState<boolean>(false);
    const [maxPage, setMaxPage] = useState<number>(0);

    useEffect(() => {
        ItemListSellerGet({ page, size }, accessToken)
            .then((res) => {
                setProducts([...products, ...res.data.data.list]);
                if (maxPage === 0) {
                    const totalCount = res.data.data.totalCount;
                    setMaxPage(Math.ceil(totalCount / size));
                }
            })
            .catch((error) => {
                console.log("useEffect ItemListSellerGer Error");
                console.log(error);
            });
    }, [page]);

    function handleCheck(
        e: React.ChangeEvent<HTMLInputElement>,
        id: number,
        price: number
    ) {
        console.log("LiveItemAdd handleCheck");
        // console.log(e.target);
        // console.log(e.target.checked);
        if (e.target.checked) {
            const initLivePrice: liveProductPrice = {
                productId: id,
                originalPrice: price,
                price: 0,
                discount: 0,
            };
            setSelectedProductId(
                new Map(selectedProductId.set(id, initLivePrice))
            );
        } else {
            selectedProductId.delete(id);
            setSelectedProductId(new Map(selectedProductId));
        }
    }

    function handleSubmit() {
        isSelectedState(true);
        onClose();
    }

    function onClose() {
        setIsOpen(false);
    }

    function handlePage() {
        if (page >= maxPage) {
            setScrollButtonHidden(true);
            return;
        }
        setPage(page + 1);
    }

    return (
        <Table variant="simple" size={"lg"}>
            <Thead>
                <Tr>
                    <Th width={"10rem"} textAlign="center">
                        <Text as={"b"} fontSize={"xl"}>
                            상품이름
                        </Text>
                    </Th>
                    <Th width={"4rem"} textAlign="center">
                        <Text as={"b"} fontSize={"xl"}>
                            가격
                        </Text>
                    </Th>
                    <Th width={"9rem"} textAlign="center">
                        <Text as={"b"} fontSize={"xl"}>
                            라이브 가격
                        </Text>
                    </Th>
                    <Th width={"9rem"} textAlign="center">
                        <Text as={"b"} fontSize={"xl"}>
                            할인율
                        </Text>
                    </Th>
                    <Th textAlign="center" width="">
                        <Text as={"b"} fontSize={"xl"}>
                            대표상품
                        </Text>
                    </Th>
                    <Th textAlign="center">
                        <Text as={"b"} fontSize={"xl"} textAlign="center">
                            취소
                        </Text>
                    </Th>
                </Tr>
            </Thead>

            <Tbody>
                {selected.map((product) => {
                    const id = product.productId;
                    return (
                        <Tr key={product.productId}>
                            <Td textAlign="center">
                                <Text
                                    as={"b"}
                                    fontSize={"xl"}
                                    textAlign="center"
                                >
                                    {product.productName.length > 5
                                        ? product.productName.slice(0, 5) +
                                          "..."
                                        : product.productName}
                                </Text>
                            </Td>
                            <Td textAlign="center">
                                <Text
                                    as={"b"}
                                    fontSize={"xl"}
                                    textAlign="center"
                                >
                                    {product.price}
                                </Text>
                            </Td>
                            <Td textAlign="center">
                                <FormControl
                                    variant="floating"
                                    isRequired
                                    isInvalid
                                >
                                    <Input
                                        type="number"
                                        data-productid={product.productId}
                                        value={selectedProductId.get(id)?.price}
                                        onBlur={handlePriceBlur}
                                        onChange={handlePriceChange}
                                    />
                                    {/* <FormLabel>가격 입력</FormLabel> */}
                                </FormControl>
                            </Td>
                            <Td textAlign="center">
                                <FormControl
                                    variant="floating"
                                    isRequired
                                    isInvalid
                                >
                                    <Input
                                        type="number"
                                        data-productid={product.productId}
                                        value={
                                            selectedProductId.get(id)?.discount
                                        }
                                        onBlur={handleDiscountBlur}
                                        onChange={handleDiscountChange}
                                    />
                                    {/* <FormLabel>할인율 입력</FormLabel> */}
                                </FormControl>
                            </Td>

                            <Td width={"1rem"} textAlign="center">
                                <Flex justifyContent={"right"}>
                                    <Switch
                                        value={id}
                                        onChange={handleMainProduct}
                                        isChecked={id === mainProductId}
                                        size={"md"}
                                    />
                                </Flex>
                            </Td>
                            <Td textAlign="center">
                                <Flex justifyContent={"right"}>
                                    <CloseButton
                                        size="md"
                                        onClick={handleDelete}
                                        value={id}
                                    />
                                </Flex>
                            </Td>
                        </Tr>
                    );
                })}
            </Tbody>
        </Table>
        // <Modal size={"5xl"} onClose={onClose} isOpen={isOpen} isCentered>
        //     <ModalOverlay />
        //     <ModalContent p={"2rem"}>
        //         <ModalHeader>
        //             <Center>
        //                 <Text as={"b"} fontSize={"3xl"}>
        //                     판매중인 상품 목록
        //                 </Text>
        //             </Center>
        //         </ModalHeader>
        //         <ModalCloseButton />

        //         <Flex minWidth={"max-content"} alignItems={"center"} gap={"2"}>
        //             <Box />
        //             <Spacer />
        //             <Flex gap={"2"} p={"1rem"}>
        //                 <Search2Icon boxSize={"2rem"} />
        //                 <Input size={"md"} placeholder="검색" />
        //             </Flex>
        //         </Flex>
        //         <ModalBody>
        //             <Box p={"3rem"}>
        //                 <Box
        //                     h={"50vh"}
        //                     borderWidth={"4px"}
        //                     borderRadius={"30px"}
        //                 >
        //                     <Box
        //                         h={"50vh"}
        //                         display={"block"}
        //                         p={"1rem"}
        //                         overflowY={"scroll"}
        //                     >
        //                         <ProductTable
        //                             products={products}
        //                             selectedProductId={selectedProductId}
        //                             handleCheck={handleCheck}
        //                         />

        //                         <Wrap
        //                             spacing="0.25rem"
        //                             hidden={scrollButtonHidden}
        //                         >
        //                             <WrapItem w="100%">
        //                                 <Button
        //                                     w="100%"
        //                                     variant="ghost"
        //                                     onClick={handlePage}
        //                                 >
        //                                     <Icon as={FaArrowDown} />
        //                                 </Button>
        //                             </WrapItem>
        //                         </Wrap>
        //                     </Box>
        //                 </Box>
        //             </Box>
        //         </ModalBody>
        //         <ModalFooter p={"1rem"}>
        //             <Button
        //                 bgColor={"themeGreen.500"}
        //                 mr={3}
        //                 onClick={handleSubmit}
        //             >
        //                 <Text as={"samp"} color={"white"}>
        //                     등록
        //                 </Text>
        //             </Button>
        //             <Button bgColor={"themeRed.500"} onClick={onClose}>
        //                 <Text as={"samp"} color={"white"}>
        //                     닫기
        //                 </Text>
        //             </Button>
        //         </ModalFooter>
        //     </ModalContent>
        // </Modal>
    );
}
