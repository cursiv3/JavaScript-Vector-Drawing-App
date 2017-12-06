function setToBoundaryMax(val, canvasPositiveMax, canvasNegativeMax) 
{
  if (val >= canvasPositiveMax) 
  {
    return canvasPositiveMax;
  } 
  else if (val <= canvasNegativeMax) 
  {
    return canvasNegativeMax;
  } 
  else 
  {
    return val;
  }
}

module.exports = setToBoundaryMax;
