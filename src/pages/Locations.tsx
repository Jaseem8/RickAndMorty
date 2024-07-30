import React, { useState, useEffect, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { getLocations } from "../services/api";
import Pagination from "../components/Pagination";
import Layout from "../components/Layout";
import LoadingSpinner from "../components/Spinner";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const LocationsContainer = styled.div`
  padding: 30px;
  background: linear-gradient(to bottom, #f0f0f0, #e0e0e0);
  border-radius: 12px;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const LocationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const LocationCard = styled.div`
  border-radius: 10px;
  padding: 20px;
  background: linear-gradient(135deg, #d0d0d0, #c0c0c0);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
  animation: ${slideIn} 0.5s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
    background: linear-gradient(135deg, #c0c0c0, #d0d0d0);
  }
`;

const LocationName = styled.h3`
  font-size: 1.6em;
  margin: 0;
  color: #333;
  text-decoration: underline;
  text-decoration-color: #999;
  transition: text-decoration-color 0.3s ease, color 0.3s ease;

  ${LocationCard}:hover & {
    text-decoration-color: #666;
    color: #000;
  }
`;

const LocationType = styled.p`
  margin: 8px 0;
  font-size: 1.1em;
  color: #666;
  font-style: italic;
  transition: color 0.3s ease;

  ${LocationCard}:hover & {
    color: #333;
  }
`;

const LocationDimension = styled.p`
  margin: 8px 0;
  font-size: 1.1em;
  color: #666;
  font-weight: bold;
  transition: color 0.3s ease;

  ${LocationCard}:hover & {
    color: #333;
  }
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  padding: 20px;
  background: #d0d0d0;
  border-radius: 10px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const FilterInput = styled.input`
  padding: 12px;
  margin: 6px 0;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: calc(100% - 24px);
  font-size: 1em;
  color: #333;
  background: #f9f9f9;
  transition: border-color 0.3s ease, background-color 0.3s ease;

  &:focus {
    border-color: #bbb;
    background-color: #fff;
    outline: none;
  }
`;

const FilterButton = styled.button`
  padding: 12px 20px;
  background-color: #ccc;
  color: #333;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease, transform 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #bbb;
    transform: scale(1.02);
    color: #000;
  }
`;

interface FiltersProps {
  onFilterChange: (filters: {
    name: string;
    type: string;
    dimension: string;
  }) => void;
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [dimension, setDimension] = useState("");

  const handleFilterChange = () => {
    onFilterChange({ name, type, dimension });
  };

  return (
    <FiltersContainer>
      <FilterInput
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <FilterInput
        type="text"
        placeholder="Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
      />
      <FilterInput
        type="text"
        placeholder="Dimension"
        value={dimension}
        onChange={(e) => setDimension(e.target.value)}
      />
      <FilterButton onClick={handleFilterChange}>Apply Filters</FilterButton>
    </FiltersContainer>
  );
};

const Locations: React.FC = () => {
  const [locations, setLocations] = useState<any[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState({ name: "", type: "", dimension: "" });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getLocations(page);
        setLocations(response.data.results);
        setFilteredLocations(response.data.results);
        setTotalPages(response.data.info.pages);
      } catch (error) {
        console.error("Failed to fetch locations:", error);
      }
    };

    fetchData();
  }, [page]);

  useEffect(() => {
    const applyFilters = () => {
      const newFilteredLocations = locations.filter(
        (location) =>
          (!filters.name ||
            location.name.toLowerCase().includes(filters.name.toLowerCase())) &&
          (!filters.type ||
            location.type.toLowerCase().includes(filters.type.toLowerCase())) &&
          (!filters.dimension ||
            location.dimension
              .toLowerCase()
              .includes(filters.dimension.toLowerCase()))
      );
      setFilteredLocations(newFilteredLocations);
    };

    applyFilters();
  }, [filters, locations]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    setPage(1); // Reset to the first page when filters are changed
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleCardClick = (id: number) => {
    navigate(`/location/${id}`);
  };

  return (
    <Layout>
      <LocationsContainer>
        <Filters onFilterChange={handleFilterChange} />
        <LocationsGrid>
          {filteredLocations.map((location) => (
            <Suspense fallback={<LoadingSpinner />}>
              <LocationCard
                key={location.id}
                onClick={() => handleCardClick(location.id)}
              >
                <LocationName>{location.name}</LocationName>
                <LocationType>Type: {location.type}</LocationType>
                <LocationDimension>
                  Dimension: {location.dimension}
                </LocationDimension>
              </LocationCard>
            </Suspense>
          ))}
        </LocationsGrid>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </LocationsContainer>
    </Layout>
  );
};

export default Locations;
