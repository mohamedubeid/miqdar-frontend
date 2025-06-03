'use client';

import Select from 'react-select';
import { Country, State } from 'country-state-city';
import { StylesConfig } from 'react-select';
import CreatableSelect from 'react-select/creatable';

type Option = {
  label: string;
  value: string;
  [key: string]: unknown;
};

type Props = {
  country: Option | null;
  state: Option | null;
  onCountryChange: (option: Option | null) => void;
  onStateChange: (option: Option | null) => void;
};

const customSelectStyles: StylesConfig<Option, false> = {
  control: (provided) => ({
    ...provided,
    backgroundColor: '#fff',
    border: '0.5px solid #5501DD66',
    borderRadius: '15px',
    padding: '0.25rem 0.5rem',
    minHeight: '64px',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#5501DD',
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#A3A3A3',
    fontSize: '1rem',
    paddingLeft: '0.5rem',
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: '0 0.5rem',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#000',
    fontSize: '1rem',
  }),
    menuList: (provided) => ({
    ...provided,
    maxHeight: 180,
    overflowY: 'auto',
  }),
};

const countries: Option[] = Country.getAllCountries().map((country) => ({
  label: country.name,
  value: country.isoCode,
  ...country,
}));

const getStates = (countryCode: string): Option[] => {
  return (
    State.getStatesOfCountry(countryCode)?.map((state) => ({
      label: state.name,
      value: state.isoCode,
      ...state,
    })) || []
  );
};

export default function CountryStateSelect({
  country,
  state,
  onCountryChange,
  onStateChange,
}: Props) {
  return (
    <div className="flex justify-between gap-12 mt-6">
      <div className="flex-1">
        <label className="text-xl text-cstm-gray block mb-3">الدولة</label>
        <Select
          options={countries}
          placeholder="Select Country"
          value={country}
          onChange={(value) => onCountryChange(value)}
          styles={customSelectStyles}
        />
      </div>
      <div className="flex-1">
        <label className="text-xl text-cstm-gray block mb-3">المدينة</label>
        <CreatableSelect
          options={country ? getStates(country.value) : []}
          placeholder="Select State"
          value={state}
          onChange={(value) => onStateChange(value)}
          isDisabled={!country}
          styles={customSelectStyles}
        />
      </div>
    </div>
  );
}
