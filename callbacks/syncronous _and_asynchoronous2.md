more about synchronous

suppose picture e computation1,computation2,computation3, tin ta computation ase
ar computation2 dependes kore ekta long running computation er upor 

ekhon amra jodi tradional upay follow kori toile
ei step e kaj ta hone


computation1----> long running comput ation ---->computation2----->computation3


eta amra php python c# e kori ekhon ekhane ekta problem ase 

computation3 er sathe computation 2 er kono relation nai still computation3 kaj korbe na jotokkhon computation2 sesh na hosse sob ektar por ekta hosse


jodi async programming use kori toile pic er moto omputation1 duita process
sprawn korbe (linux er moto/ onekta thread er moto) elta korbe computation3 er kaj ar ekta long running computation korbe eta sesh hole computation2 execute hobe 