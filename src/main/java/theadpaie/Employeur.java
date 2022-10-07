package theadpaie;

public class Employeur{

	String name = "ADP";
	String adresse;
	Integer numero_siret; //minimum 14 chiffres//
	Integer code_APE; //minimum 5 caractères//
	Integer numero_URSAFF; 
	
	public Employeur(String name, String adresse, Integer numero_siret, Integer code_APE, Integer numero_URSAFF) {
		super();
		this.name = name;
		this.adresse = adresse;
		this.numero_siret = numero_siret;
		this.code_APE = code_APE;
		this.numero_URSAFF = numero_URSAFF;
	}

	
	
	
			
}
