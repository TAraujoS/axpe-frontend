import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import Head from 'next/head';
import { getElementScrollTop } from 'helpers/scrollTo';
import useScrollPosition from 'helpers/scrollPosition';

// helpers
import SeoData from 'helpers/seo';

// store
import { setMain } from 'store/modules/main/actions';

// styles
import {
  Container,
  Hero,
  Text,
  Block,
  BlockCol,
  BlockTitle,
} from 'pages/About/styles';

function About() {
  const refEl = useRef(null);
  const dispatch = useDispatch();
  const scrollPosition = useScrollPosition();
  const [ curIndexArea, setCurIndexArea ] = useState();

  // const clickNavButton = useCallback(event => {
  //   event.preventDefault();

  //   const area = event.currentTarget.getAttribute('href');
  //   const hash = area.replace('/sobre', '');
  //   const $target = document.querySelector(hash);

  //   if ($target) {
  //     if (window.history && window.history.pushState) {
  //       history.pushState('', '', `/sobre${hash}`);
  //     }
  //     ScrollTo($target, window.innerWidth < 1170 ? 45 : 100);
  //   }

  //   return false;
  // }, []);

  function handleScrollPosition([ curTop, oldTop ]) {
    const topDiff = window.innerWidth < 1170 ? 45 : 100;
    const startTop = window.innerWidth < 1170 ? 70 : 0;
    const $btns = document.querySelectorAll('.about-nav a');
    let tempCurArea = 0;

    if (!refEl || !refEl.current) return false;

    if ($btns.length) {
      $btns.forEach(($btn, btnIndex) => {
        const href = $btn.getAttribute('href');

        if (href.search('#') >= 0 && btnIndex) {
          const $area = document.querySelector(href.replace('/sobre', ''));
          const areaTop = getElementScrollTop($area);

          if (curTop >= areaTop - topDiff) {
            tempCurArea = btnIndex;
          }
        }
      });

      if (tempCurArea != curIndexArea) {
        setCurIndexArea(tempCurArea);
      }
    }

    if (!startTop) {
      refEl.current.style.top = `0px`;
      return false;
    }

    let top = curTop > oldTop ? startTop - curTop : startTop;

    if (top < 0) {
      top = 0;
    } else if (top > startTop) {
      top = startTop;
    }

    refEl.current.style.top = `${top}px`;
  }

  useEffect(() => {
    handleScrollPosition(scrollPosition);
  }, scrollPosition);

  useEffect(() => {
    dispatch(setMain({ headerHiding: true }));
  }, []);

  return (
    <>
      <Head>
        <title>{`Sobre a Axpe - ${SeoData.title}`}</title>
        <meta name="description" content={SeoData.description} />
      </Head>
      <Container>
        {/* <Nav className="about-nav">
          <div ref={refEl}>
            <ul>
              <li>
                <a
                  href="/sobre#nosso-jeito"
                  className={!curIndexArea ? 'holos-institutional-menu active' : 'holos-institutional-menu'}
                  onClick={clickNavButton}
                >
                  Nosso jeito
                </a>
              </li>
              <li>
                <a
                  href="/sobre#nossa-casa"
                  className={curIndexArea === 1 ? 'holos-institutional-menu active' : 'holos-institutional-menu'}
                  onClick={clickNavButton}
                >
                  Nossa casa
                </a>
              </li>
              <li>
                <a
                  href="/sobre#nosso-nome"
                  className={curIndexArea === 2 ? 'holos-institutional-menu active' : 'holos-institutional-menu'}
                  onClick={clickNavButton}
                >
                  Nosso nome
                </a>
              </li>
            </ul>
          </div>
        </Nav> */}

        <Hero id="nosso-jeito">
          {/* <figure>
            <h2>Nosso Jeito</h2>
            <img src="/static/about/nosso-jeito.jpg" alt="Nosso jeito" loading='lazy'/>
          </figure> */}

          <div>
            <p>Prazer, somos a <strong>Axpe.</strong></p>
            <span>Uma imobiliária com uma visão diferente do morar</span>
          </div>
          {/* <div>
            <Title>
              <strong>Axpe.</strong> Uma imobiliária com uma{' '}
              <strong>visão diferente</strong> do morar.
            </Title>
            <Text>
              <p>
                Todos os imóveis da Axpe são especiais, mas qual deles é
                especial para você? Escolher um lugar para fazer parte da sua
                história é, também, uma decisão afetiva. E para ajudar você
                nessa escolha tão importante, você precisa de uma imobiliária
                que tenha uma visão diferente do morar, que enxergue além da
                metragem, da disposição da planta ou do número de banheiros.
                Fique tranquilo, você encontrou.
              </p>
            </Text>
          </div> */}
        </Hero>

        <Block dataTemplate="1">
          <BlockCol dataType="text">
            <BlockTitle>
              Morar é <strong>Encontro</strong>
            </BlockTitle>
            <Text>
              <p>
              Mais do que vender imóveis, a Axpe significa o ato de morar. Desde 2002, construímos pontes entre pessoas e espaços com intenção, sensibilidade e curadoria. Atuamos em São Paulo, litoral, campo e montanha — e também em Portugal — criando encontros significativos entre estilos de vida e formas de habitar.
              </p>
            </Text>
          </BlockCol>
        </Block>

        <Block dataTemplate="1">
          <BlockCol dataType="text">
            <BlockTitle>
              Imóveis que refletem <strong>quem você é</strong>
            </BlockTitle>
            <Text>
              <p>
                Acreditamos que o imóvel certo muda tudo. Porque morar bem é mais do que localização ou metragem: é encontrar um lugar que conversa com quem você é, com o ritmo da sua vida e com o que importa para você. É por isso que, na Axpe, cada escolha é guiada por escuta, empatia e repertório.
              </p>
            </Text>
          </BlockCol>
        </Block>

        <Block dataTemplate="1">
          <BlockCol dataType="text">
            <BlockTitle>
              Nosso <strong>compromisso</strong>
            </BlockTitle>
            <Text>
              <p>
                Seja você comprador ou proprietário, nosso olhar é imparcial, transparente e sempre guiado pelo que é certo. Cumprimos as regras com clareza e ética. Valorizamos seu tempo, respeitamos seu investimento e atuamos com total responsabilidade sobre o que está em jogo.
              </p>
            </Text>
          </BlockCol>
        </Block>

        <Block dataTemplate="1">
          <BlockCol dataType="text">
            <BlockTitle>
              O que nos
              <strong> move</strong>
            </BlockTitle>
            <Text>
              <p>
              O imóvel que é sua alma gêmea está na Axpe. E vice-versa. Nosso trabalho é tornar esse encontro possível, com humanidade, presença e uma linguagem que valoriza o essencial. Atendemos tanto quem está em busca de um novo lugar para viver quanto quem deseja vender um imóvel que fez parte da sua história. Porque quando o lugar certo encontra a pessoa certa, tudo faz sentido.
              </p>
            </Text>
          </BlockCol>
        </Block>

        <Block dataTemplate="1">
          <BlockCol dataType="text">
            <BlockTitle isLast={true}>
              <strong>Por que </strong>{' '} Axpe?
            </BlockTitle>
            <Text>
              <p>
                Na Axpe, seguimos as regras do mercado, cumprimos todas as leis,
                e recolhemos todos os impostos. Tintim por tintim. Não abrimos
                espaço para o jeitinho e não conduzimos negócios informalmente.
                A Axpe escolheu o lado que ela quer estar - como se diz no
                dialeto caipira: “fazemos tudo nos conforme”.
              </p>
            </Text>
          </BlockCol>
        </Block>

        {/* <Block dataTemplate="3">
          <BlockCol dataType="text">
            <BlockTitle>
              Escolhemos um lado:{` `}
              <strong>o&nbsp;da imparcialidade.</strong>
            </BlockTitle>
            <Text>
              <p>
                Toda transação tem dois lados: o do proprietário e o do
                comprador ou locatário. Todos são igualmente importantes para
                nós e, por isso, cuidamos o interesse de ambos, de forma
                imparcial, sem ‘puxar a brasa pra a sardinha’ de ninguém.
              </p>
            </Text>
          </BlockCol>
          <BlockCol dataType="image">
            <BlockImage>
              <img
                src="/static/about/05.jpg"
                alt="Escolhemos um lado: o da imparcialidade."
              />
            </BlockImage>
          </BlockCol>
        </Block>

        <Block dataTemplate="2_inverted">
          <BlockCol dataType="text">
            <BlockTitle>
              Escritórios são <strong>a sua segunda casa.</strong>
            </BlockTitle>
            <Text>
              <p>
                Nosso apuro estético para selecionar residências se estende aos
                imóveis comerciais. Somos reconhecidos por isso. Não à toa,
                empresas de inovação, agências de publicidade e mídia digital,
                produtoras e startups nos procuram para ajudar nessa busca. São
                empresas que sabem que é fundamental trabalhar em espaços
                criativos para atrair clientes e talentos especiais.
              </p>
            </Text>
          </BlockCol>
          <BlockCol dataType="image">
            <BlockImage>
              <img
                src="/static/about/07.jpg"
                alt="Escritórios são a sua segunda casa."
              />
            </BlockImage>
          </BlockCol>
        </Block> */}

        {/*
        <Block dataTemplate="2">
          <BlockCol dataType="text">
            <BlockTitle>
              Sua casa é um <strong>lugar sagrado.</strong>
            </BlockTitle>
            <Text>
              <p>
                Você sabe, vivemos em uma cidade com problemas de segurança. Por
                isso, dobramos e redobramos os cuidados antes de levar alguém
                para dentro da sua casa, verificando todos os dados de quem nos
                procura.
              </p>
            </Text>
          </BlockCol>
          <BlockCol dataType="image">
            <BlockImage>
              <img
                src="/static/about/08.jpg"
                alt="Sua casa é um lugar sagrado."
              />
            </BlockImage>
          </BlockCol>
        </Block>

        <Block dataTemplate="5">
          <BlockCol dataType="text">
            <BlockTitle>
              <strong>Privacidade é bom,</strong> e&nbsp;eu gosto.
            </BlockTitle>
            <Text>
              <p>
                A Axpe respeita sua privacidade. Aqui, você pode preencher o
                cadastro sem medo. Respeitamos a lei de sigilo de dados
                pessoais, ou seja, não compartilhamos suas informações com
                ninguém. Nada de corretores invasivos: só entramos em contato
                quando e na forma que você quiser.
              </p>
            </Text>
          </BlockCol>
          <BlockCol dataType="image">
            <BlockImage>
              <img
                src="/static/about/09.jpg"
                alt="Privacidade é bom, e eu gosto."
              />
            </BlockImage>
          </BlockCol>
        </Block>

        <Block dataTemplate="2_inverted">
          <BlockCol dataType="text">
            <BlockTitle>
              É bom saber{` `}
              <strong>onde você está pisando.</strong>
            </BlockTitle>
            <Text>
              <p>
                Somos obstinados em construir relações verdadeiras e a
                transparência é a nossa base. Por isso, fazemos questão de expor
                todos os prós e os contras de uma negociação. Vantagens e
                desvantagens, nada é omitido.
              </p>
            </Text>
          </BlockCol>
          <BlockCol dataType="image">
            <BlockImage>
              <img
                src="/static/about/10.jpg"
                alt="É bom saber onde você está pisando."
              />
            </BlockImage>
          </BlockCol>
        </Block>

        <Block dataTemplate="5_inverted">
          <BlockCol dataType="text">
            <BlockTitle>
              <strong>Detalhe é tudo.</strong>
            </BlockTitle>
            <Text>
              <p>
                Desde o seu primeiro contato conosco até a completa realização
                do seu sonho, todos os nossos sentidos estão sintonizados ao que
                você deseja. É assim, atentos aos detalhes, que construímos a
                qualidade que você conhece.
              </p>
            </Text>
          </BlockCol>
          <BlockCol dataType="image">
            <BlockImage>
              <img src="/static/about/11.jpg" alt="Detalhe é tudo." />
            </BlockImage>
          </BlockCol>
        </Block>
        */}

        {/* <Block id="nossa-casa" dataTemplate="5_diff">
          <BlockCol dataType="text">
            <BlockTitle>
              <strong>Nosso escritório é uma delícia.</strong> A vista é linda,
              com direito a pôr do sol todos os dias.
            </BlockTitle>
            <Text>
              <p>
                E ainda está num prédio modernista projetado pelo arquiteto Rino
                Levi.
              </p>
            </Text>
          </BlockCol>
          <BlockCol dataType="image">
            <BlockImage>
              <img
                src="/static/about/12.jpg"
                alt="Nosso escritório é uma delícia. A vista é linda, com direito a pôr do sol todos os dias."
              />
            </BlockImage>
          </BlockCol>
        </Block>

        <Block id="nosso-nome" dataTemplate="5_full">
          <BlockCol dataType="text">
            <BlockTitle>
              <strong>Nosso nome</strong>
              <br />
              Axpe é uma pequena aldeia no País Basco, Espanha. É um local
              especial.
            </BlockTitle>
            <Text>
              <p>
                Onde a quietude é quebrada apenas pelo sininho das ovelhas no
                pasto. Em basco, Axpe (diz-se Aspe) significa “casa ao pé da
                pedra” em referência à montanha Anboto.
              </p>
            </Text>
          </BlockCol>
          <BlockCol dataType="image">
            <BlockImage>
              <img
                src="/static/about/13.jpg"
                alt="Nosso nome Axpe é uma pequena aldeia no País Basco, Espanha. É um local especial."
              />
            </BlockImage>
          </BlockCol>
        </Block> */}
      </Container>
    </>
  );
}

export default About;
