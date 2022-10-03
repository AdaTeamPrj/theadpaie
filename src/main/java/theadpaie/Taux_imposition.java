package theadpaie;
import static java.lang.Math.*;
public class Taux_imposition {

	float salaire_minimum;
	float salaire_maximum;
	float salaire_taux;
	public Taux_imposition(float salaire_minimum, float salaire_maximum, float salaire_taux) {
		super();
		this.salaire_minimum = salaire_minimum;
		this.salaire_maximum = salaire_maximum;
		this.salaire_taux = salaire_taux;
	}
	
	float inf = Float.POSITIVE_INFINITY;
	
	public float calculs_imposition(float salaire_net_avant_impots)
	{	
		if (salaire_net_avant_impots<=salaire_minimum || salaire_net_avant_impots>salaire_maximum){
			return (0f);
			
		}
		//float part_salaire_imposable=min(salaire_maximum, salaire_net_avant_impots)-salaire_minimum;
	
		return (salaire_net_avant_impots*salaire_taux/100);
	
	}
	
}