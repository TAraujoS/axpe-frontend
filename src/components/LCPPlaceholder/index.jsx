import React from 'react';
import Tag from 'components/Tag';
import * as Caracteristics from 'pages/Building/Datasheet/caracteristics';
import SVG from 'react-inlinesvg';

import {
    DatasheetContent,
    BlockOne,
    Type,
    GroupInfo,
    CategoryRelease,
    Neighborhood,
    GroupTags,
    BlockTwo,
    BlockThree,
    Location,
    InfoContent,
    ButtonMoreInfo,
    MainContainer,
    PriceGroupDesktop,
    PriceGroupMobile,
    CharacteristicsGrid,
    CharacteristicItem,
    BuildingTitle,
    Ref
} from 'pages/Building/Datasheet/styles';
import { ButtonIcon } from '../Headerbar/styles';
import ILocation from 'assets/icons/location.svg';
import ICheck from 'assets/icons/checked-grey.svg';
import ShareIconSVG from 'assets/icons/share.svg';

// Mock data otimizado para LCP
const lcpMockData = {
    type: 'pronto',
    infos: {
        releaseStatus: 'Pronto',
        areaUseful: '410',
        areaTotal: '450',
        areaBuilding: '410',
        areaGround: '450',
        bedrooms: '4',
        suites: '4',
        parking: '5'
    },
    values: {
        sell: '3600000',
        iptu: '2600',
        currency: 'BRL'
    },
    address: {
        local: 'Alto de Pinheiros',
        state: 'SP',
        country: 'Brasil'
    },
    label: {
        isNew: true
    },
    category: 'Casa',
    title: 'Casa ampla com jardim, piscina e espaços generosos para conviver bem no Alto de Pinheiros.',
    reference: 'AX155499',
    vista: {
        Caracteristicas: {
            'Churrasqueira': 'Sim',
            'Piscina Privativa': 'Sim',
            'Sauna': 'Sim',
            'Jardim Privativo': 'Sim'
        }
    }
};

// Componente otimizado para LCP - renderiza imediatamente
const LCPPlaceholder = () => {
    return (
        <MainContainer>
            <DatasheetContent>
                <BlockOne type={lcpMockData.type}>
                    <Neighborhood>
                        {lcpMockData.address.local}
                        <Ref> Ref {lcpMockData.reference}</Ref>
                    </Neighborhood>
                    
                    <BuildingTitle>{lcpMockData.title}</BuildingTitle>
                    <hr />

                    <GroupInfo>
                        <InfoContent>
                            <GroupTags>
                                <Tag label={'Novidade'} icon="star" color="blueLight" />
                            </GroupTags>
                            <Type>{lcpMockData.category}</Type>
                        </InfoContent>
                        <Location>
                            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                `${lcpMockData.address.local}, ${lcpMockData.address.state}, ${lcpMockData.address.country}`
                            )}`} target="_blank" rel="noopener noreferrer">
                                <img src={ILocation} alt="ícone de localização" />
                                <p>Ver localização</p>
                            </a>
                            <ButtonIcon
                                type="button"
                                className="btn-share holos-search-header-button"
                                data-showcase="Busca"
                                data-label="Share"
                                aria-label='Compartilhar'
                            >
                                <SVG src={ShareIconSVG} uniquifyIDs={true} aria-hidden="true"/>
                            </ButtonIcon>
                        </Location>
                    </GroupInfo>
                </BlockOne>

                <PriceGroupMobile>
                    <Caracteristics.Sell
                        valueOnlyConsults={false}
                        sell={lcpMockData.values.sell}
                        iptu={lcpMockData.values.iptu}
                        condo=""
                        currency={lcpMockData.values.currency}
                        type={lcpMockData.type}
                    />
                    <Caracteristics.Expenses
                        valueOnlyConsults={false}
                        rent=""
                        iptu={lcpMockData.values.iptu}
                        condo=""
                        currency={lcpMockData.values.currency}
                    />
                    <ButtonMoreInfo>Fale com um corretor</ButtonMoreInfo>
                </PriceGroupMobile>

                <BlockThree type={lcpMockData.type}>
                    <Caracteristics.AreaUseFul areaUseful={lcpMockData.infos.areaUseful} />
                    <Caracteristics.AreaTotal areaTotal={lcpMockData.infos.areaTotal} />
                    <Caracteristics.AreaBuilding areaBuilding={lcpMockData.infos.areaBuilding} />
                    <Caracteristics.AreaGround areaGround={lcpMockData.infos.areaGround} />
                    <Caracteristics.Bedrooms bedrooms={lcpMockData.infos.bedrooms} />
                    <Caracteristics.Suites suites={lcpMockData.infos.suites} />
                    <Caracteristics.Parking parking={lcpMockData.infos.parking} />
                </BlockThree>

                <BlockTwo>
                    <CharacteristicsGrid>
                        {Object.entries(lcpMockData.vista.Caracteristicas).map(([label, value]) => (
                            <CharacteristicItem key={label}>
                                <img src={ICheck} alt="ícone de Check" />
                                <p>{label}</p>
                            </CharacteristicItem>
                        ))}
                    </CharacteristicsGrid>
                </BlockTwo>
            </DatasheetContent>

            <PriceGroupDesktop type={lcpMockData.type}>
                <Caracteristics.Sell
                    valueOnlyConsults={false}
                    sell={lcpMockData.values.sell}
                    iptu={lcpMockData.values.iptu}
                    condo=""
                    currency={lcpMockData.values.currency}
                    type={lcpMockData.type}
                />
                <Caracteristics.Expenses
                    valueOnlyConsults={false}
                    rent=""
                    iptu={lcpMockData.values.iptu}
                    condo=""
                    currency={lcpMockData.values.currency}
                />
                <ButtonMoreInfo>Fale com um corretor</ButtonMoreInfo>
            </PriceGroupDesktop>
        </MainContainer>
    );
};

export default LCPPlaceholder;
