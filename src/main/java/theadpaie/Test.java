package theadpaie;

public class Test {
	
	public static void main(String[] args) 
	{
		
		Fiche_de_paie test = new Fiche_de_paie (1532.35f);
		float salaire_net = test.salaire_brut;
		Cotisation cotisation_patronale = new Cotisation ("cotisation patronale", 9f);
		salaire_net=salaire_net-cotisation_patronale.calculs_taxes (test);
		Taux_imposition taux_imposition = new Taux_imposition (0f,1200f,6f);
		Taux_imposition taux_imposition_trancheb = new Taux_imposition (1200f,Float.POSITIVE_INFINITY,12f);
		salaire_net=salaire_net-taux_imposition.calculs_imposition(salaire_net)-taux_imposition_trancheb.calculs_imposition(salaire_net);
		
		System.out.println(salaire_net);
	}
	
	
	
}
