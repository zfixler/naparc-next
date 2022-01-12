import styled from "styled-components";

export const Container = styled.section`
    border-radius: 8px;
    max-width: 800px;
    margin: 0 auto;

    h1 {
        text-align: center;
        color: var(--blue);
        margin-bottom: .75em;
    }
`;

export const Title = styled.button`
    cursor: pointer;
    color: var(--blue);
    background-color: var(--white);
    border-radius: 8px;
    padding: .5em .75em;
    margin: .5em 0;
    box-shadow: var(--box-shadow);
    width: 100%;
    position: relative;
    border: 0;
    text-align: inherit;

    h2 {
        font-size: var(--fs-h3);
    }
   

    &::after {
        content: "";
        position: absolute;
        height: 30px;
        width: 30px;
        background-color: var(--blue);
        top: calc(50% - 15px);
        right: 1em;
        clip-path: polygon(75% 0%, 100% 50%, 75% 100%, 25% 100%, 50% 50%, 25% 0%);
        transform: ${({isToggled}) => isToggled ? 'rotate(90deg)' : 'rotate(0deg)'};
    }
`;

export const Item = styled.article`
    .collapsed {
        box-sizing: border-box;
        max-height: 0;
        overflow: hidden;
        opacity: 0;
    }
    `;

export const Body = styled.div`
    box-sizing: border-box;
    max-height: 1000px;
    transition: all 0.3s ease;
    padding: .5em .75em;
    opacity: 1;
`;