import { useCallback } from "react";

export default class GraphData {
  constructor() {
    this._nodes = {};
    this._links = [];
  }

  addNode = (node) => {
    this._nodes[node.id] = this._nodes[node.id] || { ...node, links: {} };
  };

  addLink = (fromNode, toNode) => {
    this._nodes[fromNode].hasLink = true;
    this._nodes[fromNode].links[toNode] = {
      id: toNode,
      target: true,
    };
    this._nodes[toNode].hasLink = true;
    this._nodes[toNode].links[fromNode] = {
      id: fromNode,
      target: false,
    };
    this._links.push({
      source: this._nodes[fromNode],
      target: this._nodes[toNode],
    });
  };
}

export const paginateArray = function (arr, pageSize = 20) {
  let newArr = [];
  let prev = 0;
  for (let i = pageSize; i <= arr.length; i += pageSize) {
    newArr.push(arr.slice(prev, i));
    prev = i;
  }
  if (arr[prev - 1] !== arr[arr.length - 1]) {
    console.log("triggered");
    console.log(arr[prev - 1], arr[arr.length - 1]);
    newArr.push(arr.slice(prev, arr.length));
  }
  return newArr;
};

const zip = function (arr1, arr2, callback) {
  for (let i = 0; i < Math.min(arr1.length, arr2.length); i++) {
    callback(arr1[i], arr2[i]);
  }
};

export const compareNodes = (activeIndex, selectedNodes = [], graphData) => {
  let primaryNode = { ...graphData._nodes[activeIndex] };
  if (activeIndex && !selectedNodes.length) {
    primaryNode.display_observed_genotype = [];
    primaryNode.alleles_count = 0;
    primaryNode.observed_genotype.forEach((alleleObject) => {
      alleleObject.genotype.split("").forEach((allele) => {
        if (allele === "1") {
          primaryNode.alleles_count++;
        }
      });
      primaryNode.display_observed_genotype.push(alleleObject.genotype);
    });
    primaryNode.display_observed_genotype = paginateArray(
      primaryNode.display_observed_genotype
    );
    return { primary: primaryNode, secondary: null };
  } else if (!activeIndex && selectedNodes.length) {
    let secondaries = selectedNodes.map((id) => {
      let node = { ...graphData._nodes[id] };
      node.display_observed_genotype = [];
      let count = 0;
      node.observed_genotype.forEach((alleleObject) => {
        let newAlleles = "";
        alleleObject.genotype.split("").forEach((allele) => {
          if (allele === "1") {
            count++;
            newAlleles += "2";
          } else {
            newAlleles += "0";
          }
        });
        node.display_observed_genotype.push(newAlleles);
      });
      node.alleles_count = count;
      node.display_observed_genotype = paginateArray(
        node.display_observed_genotype
      );
      return node;
    });
    return { primary: null, secondary: secondaries };
  } else if (activeIndex && selectedNodes.length) {
    primaryNode.display_observed_genotype = [];
    primaryNode.latent_display_genotype = [];
    primaryNode.shared_alleles = [];
    primaryNode.latent_alleles_count = 0;
    primaryNode.latent_shared_alleles = [];
    let secondaries = selectedNodes.map((id) => {
      let node = { ...graphData._nodes[id] };
      node.display_observed_genotype = [];
      node.latent_display_genotype = [];
      node.alleles_count = 0;
      node.shared_alleles = 0;
      node.latent_alleles_count = 0;
      node.latent_shared_alleles = 0;
      let primary_alleles = 0;
      let latent_primary_alleles = 0;
      zip(
        primaryNode.flat_latent_genotype,
        node.flat_latent_genotype,
        (alleleObject1, alleleObject2) => {
          let newAlleles = "";
          zip(
            alleleObject1.genotype.split(""),
            alleleObject2.genotype.split(""),
            (allele1, allele2) => {
              if (allele1 === allele2 && allele1 === "1") {
                // matching 1 (red)
                newAlleles += "1";
                node.latent_shared_alleles++;
                node.latent_alleles_count++;
                latent_primary_alleles++;
              } else if (allele1 === allele2 && allele1 === "0") {
                // matching 0 (white)
                newAlleles += "0";
              } else if (allele1 !== allele2 && allele1 === "0") {
                // primary 0 secondary 1 (secondary color);
                newAlleles += "2";
                node.latent_alleles_count++;
              } else if (allele1 !== allele2 && allele1 === "1") {
                // primary 1 secondary 0 (outline red)
                latent_primary_alleles++;
                newAlleles += "3";
              }
            }
          );
          node.latent_display_genotype.push(newAlleles);
        }
      );
      node.latent_display_genotype = paginateArray(
        node.latent_display_genotype
      );
      primaryNode.flat_latent_genotype.forEach((alleleObject) => {
        primaryNode.latent_display_genotype.push(alleleObject.genotype);
      });
      primaryNode.latent_display_genotype = paginateArray(
        primaryNode.latent_display_genotype
      );
      primaryNode.latent_shared_alleles.push(node.latent_alleles_count);
      zip(
        primaryNode.observed_genotype,
        node.observed_genotype,
        (alleleObject1, alleleObject2) => {
          let newAlleles = "";
          zip(
            alleleObject1.genotype.split(""),
            alleleObject2.genotype.split(""),
            (allele1, allele2) => {
              if (allele1 === allele2 && allele1 === "1") {
                // matching 1 (red)
                newAlleles += "1";
                node.shared_alleles++;
                node.alleles_count++;
                primary_alleles++;
              } else if (allele1 === allele2 && allele1 === "0") {
                // matching 0 (white)
                newAlleles += "0";
              } else if (allele1 !== allele2 && allele1 === "0") {
                // primary 0 secondary 1 (secondary color);
                newAlleles += "2";
                node.alleles_count++;
              } else if (allele1 !== allele2 && allele1 === "1") {
                // primary 1 secondary 0 (outline red)
                primary_alleles++;
                newAlleles += "3";
              }
            }
          );
          node.display_observed_genotype.push(newAlleles);
        }
      );
      if (!primaryNode.alleles_count) {
        primaryNode.alleles_count = primary_alleles;
      }
      if (!primaryNode.latent_alleles_count) {
        primaryNode.latent_alleles_count = latent_primary_alleles;
      }
      node.display_observed_genotype = paginateArray(
        node.display_observed_genotype
      );
      primaryNode.observed_genotype.forEach((alleleObject) => {
        primaryNode.display_observed_genotype.push(alleleObject.genotype);
      });
      primaryNode.display_observed_genotype = paginateArray(
        primaryNode.display_observed_genotype
      );
      primaryNode.shared_alleles.push(node.shared_alleles);
      return node;
    });
    return { primary: primaryNode, secondary: secondaries };
  }
};
