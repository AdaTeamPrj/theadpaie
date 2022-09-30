package com.adateam.theadpaie.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Employeur.
 */
@Entity
@Table(name = "employeur")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Employeur implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Size(min = 14, max = 14)
    @Column(name = "numero_siret", length = 14, nullable = false)
    private String numeroSiret;

    @NotNull
    @Size(min = 5, max = 5)
    @Column(name = "num_ape", length = 5, nullable = false)
    private String numApe;

    @NotNull
    @Size(min = 14, max = 14)
    @Column(name = "num_urssaf", length = 14, nullable = false)
    private String numUrssaf;

    @ManyToMany
    @JoinTable(
        name = "rel_employeur__convention_collective",
        joinColumns = @JoinColumn(name = "employeur_id"),
        inverseJoinColumns = @JoinColumn(name = "convention_collective_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "employeurs" }, allowSetters = true)
    private Set<ConventionCollective> conventionCollectives = new HashSet<>();

    @ManyToMany(mappedBy = "employeurs")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "employees", "employeurs" }, allowSetters = true)
    private Set<Location> locations = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Employeur id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Employeur name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNumeroSiret() {
        return this.numeroSiret;
    }

    public Employeur numeroSiret(String numeroSiret) {
        this.setNumeroSiret(numeroSiret);
        return this;
    }

    public void setNumeroSiret(String numeroSiret) {
        this.numeroSiret = numeroSiret;
    }

    public String getNumApe() {
        return this.numApe;
    }

    public Employeur numApe(String numApe) {
        this.setNumApe(numApe);
        return this;
    }

    public void setNumApe(String numApe) {
        this.numApe = numApe;
    }

    public String getNumUrssaf() {
        return this.numUrssaf;
    }

    public Employeur numUrssaf(String numUrssaf) {
        this.setNumUrssaf(numUrssaf);
        return this;
    }

    public void setNumUrssaf(String numUrssaf) {
        this.numUrssaf = numUrssaf;
    }

    public Set<ConventionCollective> getConventionCollectives() {
        return this.conventionCollectives;
    }

    public void setConventionCollectives(Set<ConventionCollective> conventionCollectives) {
        this.conventionCollectives = conventionCollectives;
    }

    public Employeur conventionCollectives(Set<ConventionCollective> conventionCollectives) {
        this.setConventionCollectives(conventionCollectives);
        return this;
    }

    public Employeur addConventionCollective(ConventionCollective conventionCollective) {
        this.conventionCollectives.add(conventionCollective);
        conventionCollective.getEmployeurs().add(this);
        return this;
    }

    public Employeur removeConventionCollective(ConventionCollective conventionCollective) {
        this.conventionCollectives.remove(conventionCollective);
        conventionCollective.getEmployeurs().remove(this);
        return this;
    }

    public Set<Location> getLocations() {
        return this.locations;
    }

    public void setLocations(Set<Location> locations) {
        if (this.locations != null) {
            this.locations.forEach(i -> i.removeEmployeur(this));
        }
        if (locations != null) {
            locations.forEach(i -> i.addEmployeur(this));
        }
        this.locations = locations;
    }

    public Employeur locations(Set<Location> locations) {
        this.setLocations(locations);
        return this;
    }

    public Employeur addLocation(Location location) {
        this.locations.add(location);
        location.getEmployeurs().add(this);
        return this;
    }

    public Employeur removeLocation(Location location) {
        this.locations.remove(location);
        location.getEmployeurs().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Employeur)) {
            return false;
        }
        return id != null && id.equals(((Employeur) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Employeur{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", numeroSiret='" + getNumeroSiret() + "'" +
            ", numApe='" + getNumApe() + "'" +
            ", numUrssaf='" + getNumUrssaf() + "'" +
            "}";
    }
}
