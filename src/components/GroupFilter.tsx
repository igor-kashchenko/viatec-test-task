import React from "react";
import { Button } from "react-bootstrap";
import { GroupFilter as GroupFilterType } from "../types/GroupFilter";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setTodoFilter } from "../features/todos/todoSlice";

export const GroupFilter: React.FC = () => {
  const buttonValues = Object.values(GroupFilterType);
  const dispatch = useAppDispatch();
  const groupFilter = useAppSelector((state) => state.todos.todoFilter);

  const handleFilterClick = (filter: GroupFilterType) => {
    dispatch(setTodoFilter(filter));
  };

  return (
    <div className="d-flex justify-content-center mb-3">
      {buttonValues.map((filterValue, i) => {
        const isLast = i === buttonValues.length - 1;
        const isSelected = groupFilter === filterValue;

        return (
          <Button
            key={filterValue}
            variant={isSelected ? "primary" : "outline-primary"}
            className={classNames("text-uppercase", {
              "me-2": !isLast,
            })}
            onClick={() => handleFilterClick(filterValue)}
          >
            {filterValue}
          </Button>
        );
      })}
    </div>
  );
};
