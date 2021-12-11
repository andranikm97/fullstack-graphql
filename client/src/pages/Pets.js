import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import PetsList from '../components/PetsList';
import NewPetModal from '../components/NewPetModal';
import Loader from '../components/Loader';

const ALLPETS = gql`
  query GetPets {
    pets {
      id
      name
      type
      img
    }
  }
`;

const MAKE_PET = gql`
  mutation makePet($newPet: NewPetInput!) {
    addPet(input: $newPet) {
      id
      name
      type
      img
    }
  }
`;

export default function Pets() {
  const [modal, setModal] = useState(false);
  const allPets = useQuery(ALLPETS);
  const [createPet, newPet] = useMutation(MAKE_PET);

  const onSubmit = (input) => {
    setModal(false);
    createPet({
      variables: {
        newPet: { name: input.name, type: input.type },
      },
    });
  };

  if (allPets.loading || newPet.loading) {
    return <Loader />;
  }

  if (allPets.error || newPet.error) {
    return <p>Error!</p>;
  }

  if (modal) {
    return <NewPetModal onSubmit={onSubmit} onCancel={() => setModal(false)} />;
  }

  return (
    <div className='page pets-page'>
      <section>
        <div className='row betwee-xs middle-xs'>
          <div className='col-xs-10'>
            <h1>Pets</h1>
          </div>

          <div className='col-xs-2'>
            <button onClick={() => setModal(true)}>new pet</button>
          </div>
        </div>
      </section>
      <section>
        <PetsList pets={allPets.data.pets} />
      </section>
    </div>
  );
}
