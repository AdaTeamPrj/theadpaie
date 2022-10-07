package theadpaie;

public class Employee {

String firstName ;
	
	String lastName ;
	
	String numSecuriteSociale ; // j'ai un doute sur le String, c'est pas plutot un Float ou Int ? //
	/* TODO : Ajouter length = 15 quelque part //
	  if (numSecuriteSociale.lenght() = 15){
   			break
		} else {
   			System.out.println("Mauvaix numéro de sécurité sociale")
		}
	 */
	
	String qualification;
	
	Float tauxImposition; // à récupérer dans une table en fonction du salaire //
	
	String job ;
	
	String adresse ; 
	
	
	public Employee(String firstName, String lastName, String numSecuriteSociale, String qualification,
			Float tauxImposition, String job, String adresse) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.numSecuriteSociale = numSecuriteSociale;
		this.qualification = qualification;
		this.tauxImposition = tauxImposition;
		this.job = job;
		this.adresse = adresse;
	}

	
	// Definir le prénom //
	
	public String getFirstName() {
        return this.firstName;
    }

    public Employee firstName(String firstName) {
        this.setFirstName(firstName);
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
	
    
    // Définir le nom de famille //
	
    public String getLastName() {
        return this.lastName;
    }

    public Employee lastName(String lastName) {
        this.setLastName(lastName);
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
	
	
    // Définir le numéro de sécurité sociale //
    
    public String getNumSecuriteSociale() {
        return this.numSecuriteSociale;
    }

    public Employee numSecuriteSociale(String numSecuriteSociale) {
        this.setNumSecuriteSociale(numSecuriteSociale);
        return this;
    }

    public void setNumSecuriteSociale(String numSecuriteSociale) {
        this.numSecuriteSociale = numSecuriteSociale;
    }
    
    
    
    // Définir la qualification //
    
    public String getQualification() {
        return this.qualification;
    }

    public Employee qualification(String qualification) {
        this.setQualification(qualification);
        return this;
    }

    public void setQualification(String qualification) {
        this.qualification = qualification;
    }
    

	
    // Définir le taux d'imposition //
    
    public Float getTauxImposition() {
        return this.tauxImposition;
    }

    public Employee tauxImposition(Float tauxImposition) {
        this.setTauxImposition(tauxImposition);
        return this;
    }

    public void setTauxImposition(Float tauxImposition) {
        this.tauxImposition = tauxImposition;
    }
	
	
}

	
