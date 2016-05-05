var express = require('express');
var router = express.Router();

// These parameters are based on what I have observed from the TeselaGen endpoint's output
var params = {
  minSequenceLength: 4, // The smallest length I observed was 4, even if a 4-bp plasmid is biologically nonsensical.
  maxSequenceLength: 99, // I have not observed any sequences with length > 99.
  minNumFeatures: 0,
  maxNumFeatures: 10, // The largest number of features I have observed was 10.
  alphabet: "actg".split(''),
  featureNames: [
    "Ribosome Binding Site",
    "Promoter 1",
    "Promoter 2",
    "CDS",
    "CDS2"
  ]
}

function generateRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function generateRandomSequence(length) {
  var sequence = "";
  return Array(length).join().split(',').map(function() {
    return generateRandomNucleotide();
  }).join('');
}
function generateRandomNucleotide() {
  var alphabet = params.alphabet;
  return alphabet[generateRandomInt(0, alphabet.length)];
}
function generateRandomFeatures(numFeatures, sequenceLength) {
  return Array(numFeatures).join().split(',').map(function() {
    return generateRandomFeature(sequenceLength);
  });
}
function generateRandomFeature(sequenceLength) {
  var featureLocation = generateRandomInt(0, sequenceLength - 1);
  var featureName = params.featureNames[generateRandomInt(0, params.featureNames.length)];
  return {name: featureName, index: featureLocation}
}

router.get('/', function(req, res, next) {
  var sequenceLength = generateRandomInt(params.minSequenceLength, params.maxSequenceLength);
  var numFeatures = generateRandomInt(params.minNumFeatures, params.maxNumFeatures);
  res.status(200).json({
    sequence: generateRandomSequence(sequenceLength),
    sequenceLength: sequenceLength,
    features: generateRandomFeatures(numFeatures, sequenceLength)
  });
});

module.exports = router;
