import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Head from 'next/head';
import GTM from 'helpers/gtm';
import Api from 'services';

// components
import Headerbar from 'components/Headerbar';
import BlockHighlighted from 'components/BlockHighlighted';
import NewsletterFooter from 'components/NewsletterFooter';
import BuildingList from 'components/Building/List';
import DataSheet from 'pages/Building/Datasheet';

// helpers
import CookieBuildingSeen from 'helpers/cookieBuildingSeen';
import SeoData from 'helpers/seo';

// actions
import { setMain } from 'store/modules/main/actions';

// styles
import {
  Container,
  Images,
  Alert,
  SimilarBuildings,
  SimilarBuildingsHeader,
  SimilarBuildingsList,
} from 'pages/Building/styles';

function Building({ property, meta }) {
  const dispatch = useDispatch();
  const [ similarBuildings, setSimilarBuildings ] = useState([]);
  const [ data, setData ] = useState([]);

  useEffect(() => {
    const productSeals = [];

    if (property.label) {
      Object.keys(property.label).forEach((key) => {
        if (property.label[key]) {
          productSeals.push(key);
        }
      });
    }

    CookieBuildingSeen.set(property.reference);

    dispatch(setMain({ currentBuilding: property }));

    async function loadSimilarBuildings() {
      const similar = await Api.Building.getSimilar(property, 3);
      const buildings =
        similar &&
        similar.data &&
        similar.data.length > 0 &&
        similar.data.filter((x) => x.reference !== property.reference);

      setSimilarBuildings(buildings);
    }

    GTM.dataLayerPush({
      event: 'Realty Loaded',
      productId: property.reference,
      productValue: property.values.sell
        ? property.values.sell
        : property.values.rent,
      productType: property.type,
      productLocation: property?.address?.local,
      productSeals: productSeals.join('|'),
      productNumberOfBedrooms: property.infos.bedrooms,
      productParkingSpace: property.infos.parking,
      productArea: property.infos.areaTotal
        ? property.infos.areaTotal
        : property.infos.areaUseful,
    });

    loadSimilarBuildings();
    setData(property);
  }, [ property ]);

  useEffect(() => {
    return () => {
      dispatch(setMain({ currentBuilding: null }));
    };
  }, []);

  if (!data || Object.keys(data).length === 0) return null;

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
      </Head>
      <Container>
        <Headerbar
          type="building"
          title={data.category}
          subtitle={data?.address.local}
          building={{
            reference: data.reference,
            source: data.source,
            likes: data.totalFavorites,
            local: data?.address.local,
            area: data.infos.areaBuilding,
            bedrooms: data.infos.bedrooms,
            parking: data.infos.parking,
          }}
        />

        {data.gallery && (
          <Images
            category={data.category}
            local={data?.address.local}
            items={data.gallery}
            tour360={data.tour360}
            reference={data.reference}
          />
        )}

        <DataSheet property={data} />

        <Alert>
          <p>
            As informações acima, incluindo preço, áreas e valores, podem não
            ser exatas e devem ser confirmadas com o corretor.
          </p>

          <p>
            No caso de imóveis em lançamento, as imagens são meramente
            ilustrativas e os valores estão sujeitos a alterações de tabelas.
          </p>
        </Alert>

        {/* {Object.keys(data.components).length > 0 && <Modules property={data} />} */}

        {similarBuildings && similarBuildings.length > 0 && (
          <SimilarBuildings>
            <SimilarBuildingsHeader>
              <h3>Pessoas que viram este imóvel também viram:</h3>
            </SimilarBuildingsHeader>
            <SimilarBuildingsList>
              {similarBuildings.map((building, buildingIndex) => (
                <BuildingList
                  layout="horizontal"
                  item={building}
                  page="building"
                  positionIndex={buildingIndex + 1}
                  key={`building-searchitem-${building.reference}-${buildingIndex}`}
                />
              ))}
            </SimilarBuildingsList>
          </SimilarBuildings>
        )}

        <NewsletterFooter />
        <BlockHighlighted type="contactHome" />
      </Container>
    </>
  );
}

Building.getInitialProps = async ({ query }) => {
  const slug = query.slug ? query.slug.split('-') : false;
  let reference = null;

  if (slug) {
    reference = slug[slug.length - 1];
  }

  const response = await Api.Building.getPage(reference);
  const buildingCategory = response.building.category || '';

  const buildingLocationTitle = response.building.address
    ? response.building.address.local && response.building.address.state
      ? response.building.address.local + ' ' + response.building.address.state
      : ''
    : '';
  const buildingLocation = response.building.address
    ? response.building.address.local && response.building.address.country
      ? 'em ' +
        response.building.address.local +
        ', ' +
        response.building.address.state +
        '/' +
        response.building.address.country
      : ''
    : '';
  const buildingArea = response.building.infos
    ? response.building.infos.areaUsefulStart
      ? response.building.infos.areaUsefulStart
      : response.building.infos.areaTotal
      ? response.building.infos.areaTotal
      : response.building.infos.areaBuilding
    : 0;
  const buildingBedrooms = response.building.infos
    ? response.building.infos.bedroomsStart
      ? response.building.infos.bedroomsStart
      : response.building.infos.bedrooms
    : 0;
  const buildingPark = response.building.infos
    ? response.building.infos.parkingStart
      ? response.building.infos.parkingStart
      : response.building.infos.parking
    : 0;

  const pageDescPrefix = [
    'Apartamento',
    'Apartamento Internacional',
    'Conjunto',
    'Galpão',
    'Prédio',
  ].includes(buildingCategory)
    ? 'Venha conhecer este'
    : 'Venha conhecer esta';

  const pageTitle = `${buildingCategory} ${buildingLocationTitle} com ${buildingArea}m² e ${buildingBedrooms} dormitórios ${SeoData.shortTitle}`;
  const pageDesc = `${pageDescPrefix} ${buildingCategory.toLowerCase()} ${buildingLocation} com ${buildingArea}m², ${buildingBedrooms} dormitórios e ${buildingPark} vagas de garagem. O local ideal para quem é apaixonado por arquitetura e design!`;
  const pageBanner = `${
    response.building.gallery ? response.building.gallery[0].src : ''
  }`;

  return {
    reference: reference,
    property: response.building,
    meta: {
      title: pageTitle,
      description: pageDesc,
      image: pageBanner,
    },
  };
};

export default Building;
