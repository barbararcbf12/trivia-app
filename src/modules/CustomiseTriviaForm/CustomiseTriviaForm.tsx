import Button from "../../components/Button/Button";
import ToggleSelector from "../../components/ToggleSelector/ToggleSelector";
import { AMOUNT_OPTIONS, DIFFICULTY_OPTIONS, INITIAL_QUERY_VALUE, TYPE_OPTIONS } from "../../constants/query";
import Select from "../../components/Select/Select";
import React, { Dispatch, FormEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { ApiCategoriesProps } from "../../types/triviaApi";
import { getCategories } from "../../api/getCategories";
import type { SelectChangeEvent } from "@mui/material";
import { QueryProps } from "../../types/queryOptions";

type CustomiseTriviaFormProps = {
  setQuery: Dispatch<React.SetStateAction<QueryProps>>;
  setTempQuery: Dispatch<React.SetStateAction<QueryProps>>;
  tempQuery: QueryProps;
  setOpenCustomizationOptions: Dispatch<React.SetStateAction<boolean>>;
}

export default function CustomiseTriviaForm( props: CustomiseTriviaFormProps ) {
  const { setQuery, tempQuery, setTempQuery, setOpenCustomizationOptions } = props;

  const { data: categoriesData } = useQuery<ApiCategoriesProps>({
    queryKey: ['questionCategories'],
    queryFn: getCategories,
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement> | SelectChangeEvent<string>, key: string) => {
    setTempQuery({ ...tempQuery, [key]: e.target.value });
  };

  const handleCategoryChange = (e: SelectChangeEvent<string>) => {
    setTempQuery({ ...tempQuery, category: e.target.value });
  };

  const handleConfirmSelections = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery({ ...tempQuery });
  };

  const resetSelections = () => {
    setTempQuery({ ...INITIAL_QUERY_VALUE });
  };

  return (
    <form onSubmit={ handleConfirmSelections } className="flex flex-col justify-between w-full bg-white p-4">
      <div className="flex w-full justify-between items-center h-12 border-b-grey-200 border-b">
        <h2 className="capitalize font-bold text-20">Customise your trivia</h2>
        <Button onClick={ () => setOpenCustomizationOptions(false) }>close</Button>
      </div>
      <div className="flex flex-col justify-between w-full pt-4 space-y-4">
        <div className="flex justify-between w-full">
          <ToggleSelector
            value={ tempQuery.amount }
            options={ AMOUNT_OPTIONS }
            onChange={ e => handleChange(e, 'amount') }
            label="Quantity:"
          />
          <ToggleSelector
            value={ tempQuery.difficulty }
            options={ DIFFICULTY_OPTIONS }
            exclusive={ false }
            onChange={ e => handleChange(e, 'difficulty') }
            label="Difficulty:"
          />
        </div>
        <div className="flex justify-between w-full">
          <ToggleSelector
            value={ tempQuery.type }
            options={ TYPE_OPTIONS }
            onChange={ e => handleChange(e, 'type') }
            label="Types:"
          />

          { categoriesData ? (
            <Select
              id="category-selector"
              value={ tempQuery.category }
              options={ categoriesData?.trivia_categories }
              onChange={ handleCategoryChange }
              label="Category:"
            />
           ) : null }
        </div>
        <div className="flex gap-4 w-full">
          <Button type="submit">Generate Trivia!</Button>
          <Button onClick={ resetSelections } variant="secondary">Reset selections</Button>
        </div>
      </div>
    </form>
  );
}