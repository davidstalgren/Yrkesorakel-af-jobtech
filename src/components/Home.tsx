import { DigiLayoutColumns } from '@digi/arbetsformedlingen-react';

import { RelatedOccupation } from './RelatedOccupation';
import {
  LayoutColumnsElement,
  LayoutColumnsVariation,
} from '@digi/arbetsformedlingen';
import { useNavigate } from 'react-router-dom';
import {
  IRelatedOccupationsContext,
  RelatedOccupationsContext,
} from '../contexts/RelatedOccupationsContext';
import { useContext } from 'react';

export const Home = () => {
  const navigate = useNavigate();
  const handleClick = async (id: string) => {
    navigate(`/${id}`);
  };

  const { occupations } = useContext<IRelatedOccupationsContext>(
    RelatedOccupationsContext
  );

  return (
    <div>
      <DigiLayoutColumns
        afElement={LayoutColumnsElement.DIV}
        afVariation={LayoutColumnsVariation.TWO}
        style={{ width: '80%' }}
      >
        {occupations.related_occupations?.map((occupation) => (
          <RelatedOccupation
            key={occupation.id}
            occupation={occupation}
            handleClick={handleClick}
          />
        ))}
      </DigiLayoutColumns>
    </div>
  );
};
