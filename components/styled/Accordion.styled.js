import styled from "styled-components";
import { motion } from 'framer-motion';

export const Container = styled.section`
    border-radius: 8px;
    max-width: 800px;
    margin: 0 auto;
    h1 {
        text-align: center;
        color: var(--blue);
    }
`;

export const Title = styled.h2`
    cursor: pointer;
    color: var(--blue);
    background-color: var(--white);
    border-radius: 8px;
    padding: .5em .75em;
    margin: .5em 0;
    box-shadow: var(--box-shadow);
`;

export const Item = styled.article``;

export const Body = styled(motion.div)`
    padding: .5em .75em;
`;