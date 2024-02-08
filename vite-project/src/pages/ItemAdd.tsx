import {
    Text,
    Box,
    Button,
    Center,
    Flex,
    FormControl,
    Input,
    Container,
    FormLabel,
    Select,
    FormHelperText,
    Icon,
    Img,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";

import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import FroalaEditorComponent from "react-froala-wysiwyg";
import "froala-editor/js/plugins.pkgd.min.js";
import { ItemAddFunction } from "../api/Itemlist";
import { useNavigate } from "react-router-dom";
import { formatNumberWithComma } from "../components/common/Comma";
import { AddItemInterface, UploadImage } from "../types/DataTypes";
import { CloseIcon } from "@chakra-ui/icons";
import { FaRegEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../redux/stores/store";

export default function ItemAdd() {
    const accessToken = useSelector((state: RootState) => {
        return state.user.accessToken;
    });
    const editorRef = useRef(null);
    const config = {
        editorClass: "custom-class",
        heightMin: 700,
        autofocus: true,
        attribution: false,
    };
    const [values, setValues] = useState<AddItemInterface>({
        categoryId: 0,
        productName: "",
        productContent: "",
        paymentLink: "https://naver.com",
        price: 0,
        deliveryCharge: 1000,
        quantity: 100,
    });

    const navigate = useNavigate();
    const [TitleInput, setTitleInput] = useState("");
    const TitleError = TitleInput === "";
    function EditIcon() {
        return (
            <Icon mt={"0.5rem"} boxSize={"1.8rem"} ml={"3rem"} as={FaRegEdit} />
        );
    }

    // Editor & Editor Values
    useEffect(() => {
        if (editorRef.current) {
            const root = ReactDOM.createRoot(editorRef.current);
            root.render(<FroalaEditorComponent tag="textarea" />);
        }
    }, []);

    // 입력값
    const handleNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let onlyNumber = parseInt(value.replace(/[^0-9]/g, ""));

        if (onlyNumber >= 100000000) {
            onlyNumber = 100;
        }

        if (isNaN(onlyNumber)) {
            onlyNumber = 0;
        }

        setValues((prevValues) => ({
            ...prevValues,
            [name]: onlyNumber,
        }));
    };

    const handleString = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitleInput(e.target.value);
        const { name, value } = e.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setValues((prevValues) => ({
            ...prevValues,
            ["categoryId"]: Number(value),
        }));
    };

    const handleModelChange = (model: string) => {
        setValues((prevValues) => ({
            ...prevValues,
            ["productContent"]: model,
        }));
    };

    const onSubmit = async () => {
        if (fileName !== undefined) {
            if (
                values.price >= 100 &&
                values.categoryId &&
                values.productName.length >= 1 &&
                values.productContent.length >= 1
            ) {
                formData.append("productRequest", JSON.stringify(values));
                formData.append("file", fileName.file);
                try {
                    await ItemAddFunction(formData, accessToken);
                    navigate("/v1/items/list/0");
                } catch (error) {
                    alert("등록 실패했습니다. 상품을 다시 설정해주세요.");
                }
            } else if (!values.price) {
                alert("가격을 설정해주세요");
            } else if (!values.categoryId) {
                alert("카테고리를 설정해주세요");
            } else if (!values.productContent) {
                alert("컨텐츠 내용을 적어주세요");
            } else if (!values.productName) {
                alert("상품명을 설정해주세요");
            } else {
                alert("?");
            }
        }
    };

    return (
        <>
            <Container maxW={"container.xl"} p={"3rem"}>
                <Center>
                    <Text as={"b"} fontSize={"5xl"}>
                        상품 등록
                    </Text>
                </Center>
                <Center mt={"3rem"} p={"1rem"} display={"block"}>
                    <Box p={"2rem"} mb={"1rem"}>
                        <Text fontSize={"2xl"} as={"b"}>
                            상품명
                        </Text>
                        <FormControl
                            mt={"1rem"}
                            variant="floating"
                            id="first-name"
                            isRequired
                            isInvalid={TitleError}
                        >
                            <Input
                                type="text"
                                name="productName"
                                onChange={handleString}
                                placeholder=" "
                                maxLength={10}
                            />

                            <FormHelperText>
                                제목은 10자 아래로 설정해주세요
                            </FormHelperText>

                            {TitleInput.length >= 1 ? null : (
                                <FormLabel>제목을 입력해주세요</FormLabel>
                            )}
                        </FormControl>
                    </Box>

                    <Box p={"2rem"} mb={"1rem"}>
                        <Text fontSize={"2xl"} as={"b"}>
                            가격
                        </Text>
                        <FormControl
                            mt={"1rem"}
                            variant="floating"
                            id="first-name"
                            isRequired
                            isInvalid={values.price === 0}
                        >
                            <Input
                                type="text"
                                name="price"
                                onChange={handleNumber}
                                value={formatNumberWithComma(values.price)}
                                placeholder=" "
                            />

                            <FormHelperText>
                                가격은 100원 단위로 설정해주세요
                            </FormHelperText>

                            {values.price > 0 ? null : (
                                <FormLabel>가격을 입력해주세요</FormLabel>
                            )}
                        </FormControl>
                    </Box>

                    <Box mt={"2.5rem"} p={"2rem"} mb={"1rem"}>
                        <Text fontSize={"2xl"} as={"b"}>
                            상품 사진 등록
                        </Text>

                        <Box className="Container">
                            {fileName ? (
                                <Center>
                                    <Flex direction={"row"}>
                                        <Text
                                            fontSize={"2rem"}
                                            as={"b"}
                                            mr={"0.5rem"}
                                        >
                                            업로드 된 파일
                                            <span
                                                style={{ marginLeft: "2rem" }}
                                            >
                                                :
                                            </span>
                                        </Text>
                                    </Flex>

                                    <Box
                                        className="AttachedFile"
                                        style={{
                                            fontSize: "2rem",
                                            marginLeft: "1rem",
                                        }}
                                    >
                                        {fileName.type}
                                    </Box>
                                    <Flex alignItems="center">
                                        <Input
                                            className="Input"
                                            type="file"
                                            id="file"
                                            
                                            disabled={fileName ? false : true}
                                            style={{ display: "none" }}
                                        />

                                        <label
                                            htmlFor="file"
                                            style={{ marginLeft: "1rem" }}
                                        >
                                            <EditIcon />
                                        </label>

                                        <CloseIcon
                                            ml={"2rem"}
                                            boxSize={"1rem"}
                                            onClick={ClearFile}
                                        />
                                    </Flex>
                                </Center>
                            ) : (
                                <>
                                    <Input
                                        className="Input"
                                        type="file"
                                        accept="image/jpg, image/jpeg, image/png"
                                        id="file"
                                        ref={inputEl}
                                        disabled={fileName ? true : false}
                                        style={{ display: "none" }}
                                    />

                                    <label
                                        htmlFor="file"
                                        className="AttachmentButton"
                                    >
                                        🔗 사진 업로드하기
                                    </label>
                                </>
                            )}
                        </Box>
                    </Box>

                    <Box mt={"1rem"} p={"3rem"}>
                        <Text fontSize={"2xl"} as={"b"}>
                            내용
                        </Text>
                        <Box id="editor" mt={"1rem"}>
                            <FroalaEditorComponent
                                tag="textarea"
                                config={config}
                                onModelChange={handleModelChange}
                            />
                        </Box>
                    </Box>

                    <Box p={"3rem"}>
                        <Flex>
                            <Text fontSize={"2xl"} as={"b"}>
                                카테고리
                            </Text>
                        </Flex>
                        <Select
                            mt={"1rem"}
                            placeholder="카테고리를 선택해주세요"
                            onChange={handleCategory}
                        >
                            <option value="0">농산물</option>
                            <option value="1">수산물</option>
                            <option value="2">김현종</option>
                        </Select>
                    </Box>

                    <Center mt={"5rem"}>
                        <Button
                            bgColor={"themeGreen.500"}
                            mr={3}
                            onClick={onSubmit}
                        >
                            <Text as={"samp"} color={"white"}>
                                등록
                            </Text>
                        </Button>
                        <Button bgColor={"themeRed.500"}>
                            <Text as={"samp"} color={"white"}>
                                취소
                            </Text>
                        </Button>
                    </Center>
                </Center>
            </Container>
        </>
    );
}
