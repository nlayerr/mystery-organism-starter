// Crear una matriz para almacenar las instancias de pAequor
const pAequorInstances = [];

// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};
// Funcion de fabrica pAequorFactory
const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum: specimenNum,
    dna: dna,

    // Metodo para realizar una mutacion en el ADN
    mutate() {
      // Selecciona un indice aleatorio en el ADN 
      const randomIndex = Math.floor(Math.random() * this.dna.length);

      // Genera una nueva base de ADN diferente de la original
      let newBase = this.dna[randomIndex];
      do {
        newBase = returnRandBase();
      } while (newBase === this.dna[randomIndex]);

      // Realiza la mutacion
      this.dna[randomIndex] = newBase;

      // Devuelve el objeto dna
      return this.dna
    },

    // Metodo para comparar el ADN con otro organismo
    compareDNA(otherOrganism, logResult = true) {
      let commonBases = 0;

      // Compara las bases en las mismas ubicaciones
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === otherOrganism.dna[i]) {
          commonBases++;
        }
      }

      // Calcula el porcentaje de ADN en comun
      const percentage = (commonBases / this.dna.length) * 100;

       // Si logResult es true, imprime el mensaje
       if (logResult) {
        console.log(`Specimen #${this.specimenNum} and Specimen #${otherOrganism.specimenNum} have ${percentage.toFixed(2)}% DNA in common.`);
      }

      // Devuelve el porcentaje
      return percentage;

      /* imprime el mensaje
      console.log(`Specimen #${this.specimenNum} and Specimen #${otherOrganism.specimenNum} have ${percentage.toFixed(2)}% DNA in common.`);*/ 
    },

    // Metodo para verificar si es probable que el organismo sobreviva
      willLikelySurvive() {
        // Calcula el porcentaje de 'C' y 'G' bases en el ADN
        const cgCount = this.dna.filter(base => base === 'C' || base === 'G').length;
        const percentageCG = (cgCount / this.dna.length) * 100;

        // Devuelve true si el porcentaje es al menos 60, de lo contrario, false
        return percentageCG >= 60; 
      },

      complementStrand() {
        // Mapea cada base a su complemento
        const complementMap = {
          'A': 'T',
          'T': 'A',
          'C': 'G',
          'G': 'C'
        };
        // Crea una nueva cadena complementaria
        const complementStrand = this.dna.map(base => complementMap[base]);
        return complementStrand;
      }
  };

};

// Crear 30 instancias de pAequor que pueden sobrevivir
let organismCount = 1;
while (pAequorInstances.length < 30) {
  const newOrganism = pAequorFactory(organismCount, mockUpStrand());
  if (newOrganism.willLikelySurvive()) {
    pAequorInstances.push(newOrganism);
    organismCount++;
  }
}

// Funcion auxiliar para obtener una base de ADN aletoria

/* const getRandomBase = () => {
  const bases = ['A', 'T', 'C', 'G'];
  const randomIndex = Math.floor(Math.random() * bases.length);
  return bases[randomIndex];
}*/

const organism1 = pAequorFactory(1, mockUpStrand());
const organism2 = pAequorFactory(2, mockUpStrand());

console.log(organism1.dna);
console.log(organism2.dna);

organism1.compareDNA(organism2);

const isLikelyToSurvive1 = organism1.willLikelySurvive();
console.log(`Specimen #${organism1.specimenNum} is likely to survive: ${isLikelyToSurvive1}`);


const isLikelyToSurvive2 = organism2.willLikelySurvive();
console.log(`Specimen #${organism2.specimenNum} is likely to survive: ${isLikelyToSurvive2}`);


// Imprimir la informacion de las instancias
pAequorInstances.forEach(organism => {
  console.log(`Specimen #${organism.specimenNum}: DNA - ${organism.dna.join(', ')}`);
})

// Encontrar las dos instancias mas relaciondas
let mostRelatedPair = []
let highestPercentage = 0;

for (let i = 0; i < pAequorInstances.length; i++) {
  for (let j = i + 1; j < pAequorInstances.length; j++) {
    const percentage = pAequorInstances[i].compareDNA(pAequorInstances[j], false);
    if (percentage > highestPercentage) {
      highestPercentage = percentage;
      mostRelatedPair = [pAequorInstances[i], pAequorInstances[j]];
    }
  }
}

// Imprimir las cadenas complementarias de ADN de los especimenes mas relacionados
mostRelatedPair.forEach((specimen, index) => {
  const complement = specimen.complementStrand();
  console.log(`Complement DNA of Specimen #${specimen.specimenNum}: ${complement.join(', ')}`);
});


/*if (mostRelatedPair !== null) {
  console.log(`The two most related specimens are #${mostRelatedPair[0].specimenNum} and #${mostRelatedPair[1].specimenNum} with ${highestPercentage.toFixed(2)}% DNA in common.`);
} else {
  console.log('No specimens found or an issue occurred during comparison.');
}*/
//console.log('mostRelatedPair:', mostRelatedPair);
//console.log('highestPercentage:', highestPercentage);

console.log(`The two most related specimens are #${mostRelatedPair[0].specimenNum} and #${mostRelatedPair[1].specimenNum} with ${highestPercentage.toFixed(2)}% DNA in common.`);