import { BaseEntity } from 'src/common/BaseEntity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { DriverAttribute } from './DriverAttribute';
import { DriverFee } from './DriverFee';
import { Transit } from './Transit';

export enum DriverStatus {
  INACTIVE = 'inactive',
  ACTIVE = 'active',
}

export enum DriverType {
  CANDIDATE = 'candidate',
  REGULAR = 'regular',
}

@Entity()
export class Driver extends BaseEntity {
  @Column({ nullable: true, type: 'enum', enum: DriverType })
  private type: DriverType | null;

  @Column({ nullable: false, type: 'enum', enum: DriverStatus })
  private status: DriverStatus;

  @Column({ name: 'first_name', nullable: true, type: 'varchar', length: 255 })
  private firstName: string | null;

  @Column({ name: 'last_name', nullable: true, type: 'varchar', length: 255 })
  private lastName: string | null;

  @Column({ nullable: true, type: 'varchar', length: 255 })
  private photo: string | null;

  @Column({
    name: 'driver_license',
    nullable: false,
    type: 'varchar',
    length: 255,
  })
  private driverLicense: string;

  @Column({ name: 'is_occupied', nullable: false, type: 'boolean' })
  private isOccupied: boolean;

  @OneToOne(() => DriverFee, (driverFee) => driverFee.driver)
  @JoinColumn({ name: 'fee_id' })
  public fee: DriverFee;

  @OneToMany(() => DriverAttribute, (driverAttribute) => driverAttribute.driver)
  // public attributes: DriverAttribute[];
  public attributes: Set<DriverAttribute>;

  @OneToMany(() => Transit, (transit) => transit.driver)
  // public transits: Transit[];
  public transits: Set<Transit>;

  public calculateEarningsForTransit(transit: Transit): number | null {
    return null;
    // zdublować kod wyliczenia kosztu przejazdu
  }

  public getType(): DriverType | null {
    return this.type;
  }

  public setType(type: DriverType | null): void {
    this.type = type;
  }

  public getStatus(): DriverStatus {
    return this.status;
  }

  public setStatus(status: DriverStatus): void {
    this.status = status;
  }

  public getFirstName(): string | null {
    return this.firstName;
  }

  public setFirstName(firstName: string | null): void {
    this.firstName = firstName;
  }

  public getLastName(): string | null {
    return this.lastName;
  }

  public setLastName(lastName: string | null): void {
    this.lastName = lastName;
  }

  public getPhoto(): string | null {
    return this.photo;
  }

  public setPhoto(photo: string | null): void {
    this.photo = photo;
  }

  public getDriverLicense(): string {
    return this.driverLicense;
  }

  public setDriverLicense(driverLicense: string): void {
    this.driverLicense = driverLicense;
  }

  public getIsOccupied(): boolean {
    return this.isOccupied;
  }

  public setIsOccupied(isOccupied: boolean): void {
    this.isOccupied = isOccupied;
  }

  public getFee(): DriverFee {
    return this.fee;
  }

  public setFee(fee: DriverFee): void {
    this.fee = fee;
  }

  public getAttributes(): Set<DriverAttribute> {
    return this.attributes;
  }

  public setAttributes(attributes: Set<DriverAttribute>): void {
    this.attributes = attributes;
  }

  public getTransits(): Set<Transit> {
    return this.transits;
  }
}
