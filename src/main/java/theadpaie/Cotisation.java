package theadpaie;


public class Cotisation {

	String name; 
	float taux;//en pourcentage// 
	public Cotisation(String name, float taux) 
	{
		this.name=name;
		this.taux=taux;
		
	}	
	public float calculs_taxes(Fiche_de_paie fiche_de_paie)
	{
		return(fiche_de_paie.salaire_brut*taux/100);
		
	}
}
