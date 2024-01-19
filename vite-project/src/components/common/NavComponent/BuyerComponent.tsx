import { Box, Flex, Link, Spacer } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function SellerComponent() {
    const navigate = useNavigate();
    return (
        <Box>
            <Flex minWidth="max-content" alignItems="center" gap="3">
                <div />
                <Link
                    onClick={() => {
                        navigate("/v1/live/list");
                    }}
                    color={"black"}
                    _hover={{ color: "#126F54" }}
                    className="NavFont"
                >
                    라이브
                </Link>
                <Spacer />
                <Link
                    onClick={() => {
                        navigate("/v1/items/list");
                    }}
                    color={"black"}
                    _hover={{ color: "#126F54" }}
                    className="NavFont"
                >
                    상품 목록
                </Link>
                <Spacer />
                <Link
                    onClick={() => {
                        navigate("/v1/calendar");
                    }}
                    color={"black"}
                    _hover={{ color: "#126F54" }}
                    className="NavFont"
                >
                    라이브 달력
                </Link>
                <div />
            </Flex>
        </Box>
    );
}
