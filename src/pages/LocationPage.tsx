// File: src/pages/LocationPage.tsx

import React, { useState, useEffect, Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getLocation, getCharacter } from "../services/api";
import Layout from "../components/Layout";
import LoadingSpinner from "../components/Spinner";
const ResidentCard = React.lazy(() => import("../components/ResidentCard"));

const LocationContainer = styled.div`
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
  background: linear-gradient(145deg, #f0f0f0, #ffffff);
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
`;

const LocationHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const LocationImage = styled.img`
  border-radius: 12px;
  width: 120px;
  height: 120px;
  object-fit: cover;
  margin-right: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const LocationDetails = styled.div`
  flex: 1;
`;

const LocationTitle = styled.h1`
  margin: 0;
  font-size: 2em;
  color: #333;
  font-weight: bold;
`;

const LocationDetail = styled.p`
  margin: 6px 0;
  font-size: 1.1em;
  color: #555;
`;

const ResidentsList = styled.div`
  margin-top: 20px;
`;

const ResidentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  background: #f9f9f9;
  padding: 10px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const LocationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [location, setLocation] = useState<any>(null);
  const [residents, setResidents] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const locationResponse = await getLocation(Number(id));
        setLocation(locationResponse.data);

        const residentPromises = locationResponse.data.residents.map(
          (url: string) => getCharacter(parseInt(url.split("/").pop() || ""))
        );
        const residentResponses = await Promise.all(residentPromises);
        setResidents(residentResponses.map((res) => res.data));
      } catch (error) {
        console.error("Failed to fetch location or residents:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!location) return <LoadingSpinner />;

  const handleResidentClick = (residentId: number) => {
    navigate(`/character/${residentId}`);
  };

  return (
    <Layout>
      <LocationContainer>
        <LocationHeader>
          <LocationImage
            src={`https://via.placeholder.com/120?text=${location.name}`}
            alt={location.name}
          />
          <LocationDetails>
            <LocationTitle>{location.name}</LocationTitle>
            <LocationDetail>Type: {location.type || "N/A"}</LocationDetail>
            <LocationDetail>
              Dimension: {location.dimension || "N/A"}
            </LocationDetail>
            <LocationDetail>Residents: {residents.length}</LocationDetail>
          </LocationDetails>
        </LocationHeader>
        <LocationDetail>
          <strong>Created:</strong>{" "}
          {new Date(location.created).toLocaleDateString()}
        </LocationDetail>

        <ResidentsList>
          <h2>Residents</h2>
          <ResidentGrid>
            {residents.map((resident) => (
              <Suspense fallback={<LoadingSpinner />}>
                <ResidentCard
                  key={resident.id}
                  resident={resident}
                  onClick={() => handleResidentClick(resident.id)}
                />
              </Suspense>
            ))}
          </ResidentGrid>
        </ResidentsList>
      </LocationContainer>
    </Layout>
  );
};

export default LocationPage;
