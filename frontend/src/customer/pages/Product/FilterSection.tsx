import { Button, Divider, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Slider } from '@mui/material'
import { teal } from '@mui/material/colors'
import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../State/Store'
import { fetchFilterOptions } from '../../../State/customer/ProductSlice'

const FilterSection = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { category } = useParams();
  const { product } = useAppSelector((store) => store);
  const { filterOptions } = product;

  const [priceRange, setPriceRange] = useState<number[]>([0, 0]);

  useEffect(() => {
    const priceParam = searchParams.get("price");
    const [minPrice, maxPrice] = priceParam ? priceParam.split("-").map(Number) : [undefined, undefined];
    dispatch(fetchFilterOptions({
      category,
      color: searchParams.get("color") || undefined,
      minPrice,
      maxPrice,
    }));
  }, [category, searchParams]);

  useEffect(() => {
    const priceParam = searchParams.get("price");
    if (priceParam) {
      setPriceRange(priceParam.split("-").map(Number));
    } else {
      setPriceRange([filterOptions.minPrice, filterOptions.maxPrice]);
    }
  }, [filterOptions]);

  const updateFilterParams = (e: any) => {
    const { value, name } = e.target;
    if (value) {
      searchParams.set(name, value);
    } else {
      searchParams.delete(name);
    }
    setSearchParams(searchParams);
  };

  const handlePriceCommit = (event: Event | React.SyntheticEvent, newValue: number | number[]) => {
    const [min, max] = newValue as number[];
    searchParams.set("price", `${min}-${max}`);
    setSearchParams(searchParams);
  };

  const clearAllFilters = () => {
    searchParams.forEach((value: any, key: any) => {
      searchParams.delete(key);
    });
    setSearchParams(searchParams);
  };

  return (
    <div className='-z-50 space-y-5 bg-white'>
      <div className='flex items-center justify-between h-[40px] px-9 lg:border-r'>
        <p className='text-lg font-semibold -mt-1'>Filters</p>
        <Button onClick={clearAllFilters} size='small' className='text-teal-600 cursor-pointer font-semibold'>
          clear all
        </Button>
      </div>
      <Divider/>

      <div className='px-9 space-y-6'>
        <section>
          <FormControl>
            <FormLabel sx={{
              fontSize: '16px',
              fontWeight: 'bold',
              color: teal[500],
              pb: '14px',
            }}
            className='text-2xl font-semibold' id='color'>Color</FormLabel>
            <RadioGroup
              aria-labelledby="color"
              value={searchParams.get("color") || ""}
              name="color"
              onChange={updateFilterParams}
            >
              {filterOptions.colors.map((color) =>
              <FormControlLabel key={color} value={color} control={<Radio />} label={color} />)}
            </RadioGroup>
          </FormControl>
        </section>
        <Divider/>
        <section>
          <FormControl fullWidth>
            <FormLabel
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                pb: "14px",
                color: teal[600],
              }}
              className="text-2xl font-semibold"
              id="price"
            >
              Price: $ {priceRange[0]} - $ {priceRange[1]}
            </FormLabel>
            <Slider
              value={priceRange}
              onChange={(e, newValue) => setPriceRange(newValue as number[])}
              onChangeCommitted={handlePriceCommit}
              onClick={(e) => e.stopPropagation()}
              min={filterOptions.minPrice}
              max={filterOptions.maxPrice}
              valueLabelDisplay="auto"
              sx={{ mx: 1, width: "90%" }}
            />
          </FormControl>
        </section>
      </div>
    </div>
  )
}

export default FilterSection