export default function Button({
  level,
  difficultSelected,
  handleReset,
  temporizador,
}) {
  return (
    <button
      key={level}
      onClick={() => {
        difficultSelected(level);
        handleReset();
      }}
    >
      {level}
    </button>
  );
}
