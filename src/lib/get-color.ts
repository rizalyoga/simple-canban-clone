export const getColorBackground = (index: number) => {
  const colors = [
    "bg-primary_surface",
    "bg-secondary_surface",
    "bg-danger_surface",
    "bg-success_surface",
  ];

  const result = colors[index % colors.length];
  return result;
};

export const getColorBorder = (index: number) => {
  const colors = [
    "border-primary_main",
    "border-secondary_border",
    "border-danger_border",
    "border-success_border",
  ];

  const result = colors[index % colors.length];
  return result;
};

export const getColorText = (index: number) => {
  const colors = [
    "text-primary_main",
    "text-secondary_main",
    "text-danger_main",
    "text-success_main",
  ];

  const result = colors[index % colors.length];
  return result;
};
