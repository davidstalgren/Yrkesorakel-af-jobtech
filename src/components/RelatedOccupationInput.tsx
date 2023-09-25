import { useContext, useState } from 'react';
import { postSearchQuery } from '../services/relatedOccupationsSearchService';
import './RelatedOccupationInput.scss';
import {
  IRelatedOccupationsContext,
  RelatedOccupationsContext,
} from '../contexts/RelatedOccupationsContext';
import {
  FormTextareaVariation,
  FormTextareaValidation,
} from '@digi/arbetsformedlingen';
import {
  DigiButton,
  DigiDialog,
  DigiFormInput,
  DigiFormTextarea,
  DigiLayoutContainer,
} from '@digi/arbetsformedlingen-react';
import { DigiFormTextareaCustomEvent } from '@digi/arbetsformedlingen/dist/types/components';
import { DialogSize, DialogHeadingLevel } from '@digi/arbetsformedlingen';
import { useNavigate } from 'react-router-dom';
import { StyledDigiButton } from './styled/Buttons';

const RelatedOccupationInput = () => {
  const [_showLengthError, setShowLengthError] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const { dispatch } = useContext<IRelatedOccupationsContext>(
    RelatedOccupationsContext
  );
  const [searchText, setSearchText] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const queryLength = searchText.split(' ').length;
    if (queryLength >= 3) {
      setShowLengthError(false);
      const response = await postSearchQuery(searchText);
      dispatch({ type: 'SET_RELATED_OCCUPATIONS', payload: response });
      dispatch({
        type: 'SET_LATEST_SEARCH',
        payload: { title: '', freeText: searchText },
      });
      setSearchText('');
      navigate('/related-occupations');
    } else {
      setShowLengthError(true);
    }
  };

  const handleSearchTextChange = (event: DigiFormTextareaCustomEvent<any>) => {
    setSearchText(event.target.value);
  };

  return (
    <DigiLayoutContainer afVerticalPadding>
      <div>
        <DigiFormTextarea
          value={searchText}
          onAfOnChange={handleSearchTextChange}
          afLabel="Fritext sök"
          afVariation={FormTextareaVariation.MEDIUM}
          afValidation={FormTextareaValidation.NEUTRAL}
        />
        <DigiFormInput afLabel="Titel" />
        <StyledDigiButton
          onAfOnClick={handleSubmit}
          af-variation="primary"
          style={{ marginRight: '0.5rem' }}
        >
          Sök
        </StyledDigiButton>
        <DigiButton
          af-variation="secondary"
          onAfOnClick={() => {
            setSearchText('');
          }}
        >
          Rensa
        </DigiButton>
        <DigiDialog
          afSize={DialogSize.MEDIUM}
          afShowDialog={showDialog}
          afHeadingLevel={DialogHeadingLevel.H3}
          afHeading="Sökningen gav inga resultat, prova att söka med andra ord."
          afCloseButtonText=""
          afPrimaryButtonText="OK"
          onAfOnClose={() => setShowDialog(false)}
          onAfPrimaryButtonClick={() => {
            setShowDialog(false);
          }}
        />
      </div>
    </DigiLayoutContainer>
  );
};

export default RelatedOccupationInput;
