import React from "react";

function MyTable(props: any) {
  const { headings, children } = props;
  return (
    <div className="max-w-full min-w-full overflow-auto mytable__wrapper">
      <table className="min-w-full max-w-full mytable">
        <thead>
          <tr>
            {headings?.map((th: any, i: number) => {
              return (
                <th
                  className={`${th.align === "left" && "text-left"} ${
                    th.align === "center" && "text-center"
                  } ${th.align === "right" && "text-right"}`}
                >
                  {th?.title}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export default MyTable;
