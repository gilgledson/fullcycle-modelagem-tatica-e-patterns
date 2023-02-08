import Address from "../object-value/address";

export default interface CustomerInterface {
  addRewardPotins(addRewardPotins: number): void;
  changeAddress(address: Address): void;
  isActive(): boolean;
  activate(): void;
  deactivate(): void;
  validate(): void;
  changeName(name: string): void;

  get rewardPoints(): number;
  get id(): string;
  get name(): string;
  get address(): Address;

  set address(address: Address);
  set id(val: string);
  set name(name: string);
}
