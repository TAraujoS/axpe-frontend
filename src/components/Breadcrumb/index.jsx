import React from 'react';
import Router from 'next/router'
import Image from 'next/image';

// styles
import {
  Container,
  InfoLeft,
  InfoRight,
  Reference,
  FavoriteMobile,
  FavoriteDesktop,
  BackMobile,
  BackDesktop,
  Category,
  Local,
  MoreInfo,
  NumberPhone
} from './styles';

export default function Breadcrumb({ category, local, reference, className }) {
  return (
    <Container className={className}>
      <InfoLeft>
        <BackDesktop onClick={() => Router.back()}>
          <Image src='/assets/icons/arrow-prev-orange.svg' alt="Voltar" layout='fill' loading='lazy'/>
          <span>Voltar</span>
        </BackDesktop>
        <BackMobile onClick={() => Router.back()}>
          <Image src='/assets/icons/arrow-prev-green.svg' alt="Voltar" layout='fill' loading='lazy'/>
        </BackMobile>
        <div>
          <Category>{category}</Category>
          <Local>{local}</Local>
        </div>
      </InfoLeft>

      {reference && (
        <InfoRight>
          <Reference>Ref {reference}</Reference>
          <FavoriteMobile src='/assets/icons/heart-orange.svg' alt="Favoritos" layout='responsive' loading='lazy'/>
          <FavoriteDesktop>
            <span>3</span>
            <Image src='/assets/icons/heart-black.svg' alt="Favoritos"layout='responsive' loading='lazy'/>
          </FavoriteDesktop>
          <MoreInfo type="button">Mais Informações</MoreInfo>
          <NumberPhone color="orange" />
        </InfoRight>
      )}
    </Container>
  );
}
